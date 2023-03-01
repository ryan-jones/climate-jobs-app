######## JOB QUERIES ##################
INSERT_JOBS = (
    """
        INSERT INTO jobs (company_name, source, href, title, location, posted, salary)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """
)

DELETE_JOBS = 'DELETE FROM jobs'

RETRIEVE_JOBS = (
    '''
        SELECT row_to_json(q)
        FROM (
        SELECT j.id, j.source, j.href, j.company_name, j.location, j.title, j.posted, j.salary, j.last_updated, array_agg(sectors.name) as sectors
        FROM jobs j
        JOIN job_sectors ON j.id = job_sectors.job_id
        JOIN sectors ON job_sectors.sector_id = sectors.id
        GROUP BY j.id
        ) q
    '''
)
########################################


########### JOB SECTOR QUERIES #########
INSERT_JOB_SECTOR = (
    '''
        INSERT INTO job_sectors(job_id, sector_id)
        VALUES (%s, %s)
        RETURNING job_id
    '''
)

DELETE_JOB_SECTORS = 'DELETE FROM job_sectors'
########################################


########### SECTOR QUERIES #############
RETRIEVE_SECTORS = 'SELECT name FROM sectors'

RETRIEVE_SECTOR = 'SELECT id FROM sectors WHERE name = %s'

########################################
