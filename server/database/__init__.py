import os

import psycopg2
from dotenv import load_dotenv


load_dotenv()


def initialize_db_connection():
    db_url = os.getenv("DATABASE_URL")
    connection = psycopg2.connect(db_url)
    return connection


def init_db(func):
    def wrapper_function(*args, **kwargs):
        connection = initialize_db_connection()
        cursor = connection.cursor()
        result = func(cursor, *args, **kwargs)
        connection.commit()
        cursor.close()
        connection.close()
        return result

    return wrapper_function
