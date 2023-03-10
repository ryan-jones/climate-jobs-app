######## JOB QUERIES ##################
INSERT_JOBS = (
    """
        INSERT INTO jobs (company_name, source, href, title, location, posted, salary)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """
)

DELETE_JOBS = 'DELETE FROM jobs'

RETRIEVE_JOBS_COUNT = 'SELECT COUNT(*) FROM jobs'


########### JOB SECTOR QUERIES #########
INSERT_JOB_SECTOR = (
    '''
        INSERT INTO job_sectors(job_id, sector_id)
        VALUES (%s, %s)
        RETURNING job_id
    '''
)

DELETE_JOB_SECTORS = 'DELETE FROM job_sectors'


########### SECTOR QUERIES #############
RETRIEVE_SECTORS = (
    '''
        SELECT row_to_json(q)
        FROM (
            SELECT *
            FROM sectors
        ) q
    '''
)

RETRIEVE_SECTOR = 'SELECT id FROM sectors WHERE name = %s'
