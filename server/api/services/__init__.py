import json
import psycopg2
from psycopg2.extras import execute_values

from api.database import init_db
from api.database.queries import INSERT_JOB_SECTOR, INSERT_JOBS, DELETE_JOBS, RETRIEVE_JOBS, RETRIEVE_SECTOR
from api.services.jobs import get_climate_jobs
from api.services.utils import format_sector


@init_db
def get_jobs(cursor, offset):
    cursor.execute(
        f"""
           {RETRIEVE_JOBS}
            LIMIT 10
            OFFSET {offset or 0};
        """
    )
    data = cursor.fetchall()
    # Convert each row to a dictionary
    results = [{key: value for key, value in row[0].items()} for row in data]

    # Convert the list of dictionaries to a JSON object
    response = json.dumps(results)
    return response


def create_job_sectors(cursor, job_id, sector):
    formatted_sector = format_sector(sector)
    cursor.execute(RETRIEVE_SECTOR, ([formatted_sector]))
    result = cursor.fetchone()
    if result is None:
        print(f'None value for {formatted_sector}')
        return (job_id, None)
    sector_id = result[0]
    return (job_id, sector_id)


@init_db
def update_jobs_list(cursor):
    try:
        data = get_climate_jobs()
        jobs = data['jobs']

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
def get_sectors(cursor):
    cursor.execute('SELECT * FROM sectors')
    data = cursor.fetchall()
    return data
