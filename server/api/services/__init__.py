import json
import ast
import psycopg2
from psycopg2.extras import execute_values

from api.database import init_db
from api.database.queries import INSERT_JOB_SECTOR, INSERT_JOBS, DELETE_JOBS, DELETE_JOB_SECTORS, RETRIEVE_SECTORS
from api.services.jobs import get_climate_jobs, create_job_sectors


@init_db
def get_sectors(cursor):
    print('INSIDE GET SECTORS REQUEST')
    '''Retrieves sectors jobs can be categorized by (eg. "Energy", "Advocacy", etc)'''
    cursor.execute(RETRIEVE_SECTORS)
    data = cursor.fetchall()
    # Convert each row to a dictionary
    results = [{key: value for key, value in row[0].items()} for row in data]
    return results


@init_db
def get_jobs(cursor, filters):
    where_filters = [filters[key] for key in filters if key != 'sectors']

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


@ init_db
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
