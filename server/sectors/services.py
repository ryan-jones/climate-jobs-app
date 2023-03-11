from flask import current_app
import psycopg2
from database import init_db
from database.queries import RETRIEVE_SECTORS


def format_sector(sector):
    sector_name = sector.lower()

    if sector_name in ['capital', 'energy', 'transportation', 'built environment', 'carbon technology', 'research & education']:
        return sector_name

    if sector_name in ['advocacy or policy', 'supporting catalysts']:
        return 'advocacy'

    if sector_name in ['buildings']:
        return 'built environment'

    if sector_name in ['carbon removal tech']:
        return 'carbon technology'

    if sector_name in ['climate adaptation', 'intelligence and adaptation']:
        return 'adaptation'

    if sector_name in ['food, agriculture, & land use', 'food and agriculture']:
        return 'food & agriculture'

    if sector_name in ['materials & manufacturing', 'industry and manufacturing']:
        return 'industry'

    if sector_name in ['transportation and mobility']:
        return 'transportation'

    if sector_name in ['energy and grid']:
        return 'energy'

    if sector_name in ['media & journalism']:
        return 'media'

    if sector_name in ['coastal & ocean sinks']:
        return 'environmental solutions'

    return sector_name


@init_db
def get_sectors(cursor):
    '''Retrieves sectors jobs can be categorized by (eg. "Energy", "Advocacy", etc)'''
    try:
        current_app.logger.info('fetching sectors')

        cursor.execute(RETRIEVE_SECTORS)
        data = cursor.fetchall()
        # Convert each row to a dictionary
        results = [{key: value for key, value in row[0].items()}
                   for row in data]
        return results
    except (psycopg2.Error) as error:
        current_app.logger.error(f'failed to retrieve sectors => {error}')
