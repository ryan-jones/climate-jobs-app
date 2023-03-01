import json
import psycopg2
from psycopg2.extras import execute_values

from api.database import init_db
from api.database.queries import INSERT_JOB_SECTOR, INSERT_JOBS, DELETE_JOBS, RETRIEVE_JOBS, DELETE_JOB_SECTORS, RETRIEVE_SECTORS
from api.services.jobs import get_climate_jobs, create_job_sectors


@init_db
def get_sectors(cursor):
    '''Retrieves sectors jobs can be categorized by (eg. "Energy", "Advocacy", etc)'''
    cursor.execute(RETRIEVE_SECTORS)
    data = cursor.fetchall()
    return data


@init_db
def get_jobs(cursor, filters):
    print('filters', filters)
    where_filters = []
    if 'company_name' in filters:
        where_filters.append(f"company_name = '{filters['company_name']}'")
    if 'location' in filters:
        where_filters.append(f"location = '{filters['location']}'")
    where_clause = "WHERE " + \
        " AND ".join(where_filters) if where_filters else ""

    query_string = f"""
           {RETRIEVE_JOBS}
            {where_clause}
            LIMIT 10
            OFFSET {filters.get('offset', 0)};
        """
    print('QUERY ===> ', query_string)
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
