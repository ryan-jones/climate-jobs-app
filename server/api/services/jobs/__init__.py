import multiprocessing
from api.services.jobs.climate_base import get_climate_base_jobs
from api.services.jobs.climate_people import get_climate_people_jobs
from api.database.queries import RETRIEVE_SECTOR
from api.services.sectors import format_sector


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