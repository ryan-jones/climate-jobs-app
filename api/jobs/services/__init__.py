import json

from psycopg2.extras import execute_values

from database import init_db
from services.climate_jobs import get_climate_jobs


@init_db
def get_jobs(cursor):
    cursor.execute(
        """
          SELECT row_to_json(climate_jobs) AS json_object
          FROM climate_jobs;
        """
    )
    data = cursor.fetchall()
    # Convert each row to a dictionary
    results = [{key: value for key, value in row[0].items()} for row in data]

    # Convert the list of dictionaries to a JSON object
    response = json.dumps(results)
    print(response)
    return response


CREATE_JOBS_TABLE = (
    """CREATE TABLE IF NOT EXISTS climate_jobs (
    id SERIAL PRIMARY KEY,
    source TEXT, 
    href TEXT, 
    title TEXT, 
    company TEXT, 
    location TEXT, 
    posted TEXT,
    last_updated DATE DEFAULT CURRENT_TIMESTAMP
    );"""
)

DELETE_JOBS = (
    'DELETE FROM climate_jobs'
)

INSERT_JOBS = (
    """INSERT INTO climate_jobs (company, source, href, title, location, posted)
        VALUES %s
    """
)


@init_db
def update_jobs_list(cursor):
    data = get_climate_jobs()
    jobs = data['jobs']
    values = [
        (job['company'], job['source'], job['href'],
         job['title'], job['location'], job['posted'])
        for job in jobs
    ]
    cursor.execute(CREATE_JOBS_TABLE)
    cursor.execute(DELETE_JOBS)  # removes old job data
    execute_values(cursor, INSERT_JOBS, values)
    return {"message": f"{data['count']} jobs added"}, 201
