import json
import ast
import multiprocessing

import psycopg2
from psycopg2.extras import execute_values
from sectors.services import format_sector
from jobs.climate_base import get_climate_base_jobs
from jobs.climate_people import get_climate_people_jobs
from database import init_db
from database.queries import INSERT_JOB_SECTOR, INSERT_JOBS, DELETE_JOBS, DELETE_JOB_SECTORS, RETRIEVE_JOBS_COUNT, RETRIEVE_SECTOR


def create_job_sectors(cursor, job_id, sector):
    formatted_sector = format_sector(sector)
    cursor.execute(RETRIEVE_SECTOR, ([formatted_sector]))
    result = cursor.fetchone()
    if result is None:
        print(f'None value for {formatted_sector}')
        return (job_id, None)
    sector_id = result[0]
    return (job_id, sector_id)


def get_climate_jobs():
    pool = multiprocessing.Pool()
    pages = list(range(3))

    # Request jobs from both sources concurrently
    climate_base_jobs = pool.map(get_climate_base_jobs, pages)
    climate_people_jobs = pool.map(get_climate_people_jobs, pages)

    # Flatten the lists
    climate_base_jobs = [job for page in climate_base_jobs for job in page]
    climate_people_jobs = [job for page in climate_people_jobs for job in page]

    # Combine the results and sort by posting date
    climate_jobs = climate_base_jobs + climate_people_jobs
    # return {'count': len(climate_jobs), 'jobs': sorted(climate_jobs, key=lambda d: d['posted'], reverse=True)}
    return {'count': len(climate_jobs), 'jobs': climate_jobs}


@init_db
def get_jobs(cursor, filters):
    where_filters = [filters[key]
                     for key in filters if key not in ['sectors', 'offset']]

    where_clause = "WHERE " + \
        " AND ".join(where_filters) if where_filters else ""

    having_clause = f"HAVING ARRAY{filters['sectors']} && ARRAY(SELECT sector_id FROM job_sectors WHERE job_id = j.id)" if 'sectors' in filters and len(
        ast.literal_eval(filters['sectors'])) > 0 else ""

    query_string = f"""
            SELECT row_to_json(q)
            FROM (
                SELECT j.id, j.source, j.href, j.company_name, j.location, j.title, j.posted, j.salary, j.last_updated, array_agg(sectors.name) as sectors
                FROM jobs j
                JOIN job_sectors ON j.id = job_sectors.job_id
                JOIN sectors ON job_sectors.sector_id = sectors.id
                GROUP BY j.id
                {having_clause}
            ) q
            {where_clause}
            LIMIT 10
            OFFSET {filters.get('offset', 0)};
        """
    cursor.execute(
        query_string
    )
    data = cursor.fetchall()
    # Convert each row to a dictionary
    results = [{key: value for key, value in row[0].items()} for row in data]

    # Convert the list of dictionaries to a JSON object
    response = json.dumps(results)
    return response


@init_db
def update_jobs_list(cursor):
    try:
        data = get_climate_jobs()
        jobs = data['jobs']
        cursor.execute(DELETE_JOB_SECTORS)
        cursor.execute(DELETE_JOBS)  # removes old job data

        for job in jobs:

            values = (job['company'], job['source'], job['href'],
                      job['title'], job['location'], job['posted'], job['salary'])

            cursor.execute(INSERT_JOBS, values)

            job_id = cursor.fetchone()[0]
            for sector in job['sectors']:
                job_sector = create_job_sectors(cursor, job_id, sector)
                cursor.execute(INSERT_JOB_SECTOR, job_sector)

        return {"message": f"{data['count']} jobs added"}, 201
    except (psycopg2.Error) as error:
        print('Failed to insert job records', error)


@init_db
def get_job_total_count(cursor):
    try:
        cursor.execute(RETRIEVE_JOBS_COUNT)
        data = cursor.fetchone()[0]
        return {"count": data}
    except (psycopg2.Error) as error:
        print('Failed to retrieve jobs count', error)
