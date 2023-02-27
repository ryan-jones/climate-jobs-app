import multiprocessing
import time
from datetime import datetime, date

import requests
from bs4 import BeautifulSoup


def format_posting(date_string):
    try:
        posting_date = datetime.strptime(date_string, '%B %d %Y').date()
        current_date = date.today()
        days_since_posting = (posting_date - current_date).days
        day_text = 'days' if days_since_posting > 1 else 'day'
        return f'{days_since_posting} {day_text} ago'
    except ValueError:
        return date_string


def build_job_object(source, url, job_dict):
    climate_jobs = []
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.select(job_dict['jobs'])
    job_links = soup.select(job_dict['job_links'])
    job_titles = soup.select(job_dict['job_titles'])
    company_names = soup.select(job_dict['company_names'])
    job_locations = soup.select(job_dict['job_locations']) if job_dict['job_locations'] else None
    job_postings = soup.select(job_dict['job_postings'])
    for index, job in enumerate(jobs):
        climate_jobs.append({
            'source': source,
            'href': f"{source}{job_links[index].get('href', None)}",
            'title': job_titles[index].getText(),
            'company': company_names[index].getText(),
            'location': job_locations[index].getText().strip() if job_locations else None,
            'posted': format_posting(job_postings[index].getText().strip())
        })
    return climate_jobs


def get_climate_base_jobs(page):
    climate_base_jobs = []
    url = f'https://climatebase.org/jobs?l=&q=&p={page}&remote=false'
    climate_base_jobs.extend(build_job_object('climatebase.org', url, {
        'jobs': '.list_card',
        'job_links': '.list_card',
        'job_titles': '.list_card__title',
        'company_names': '.list_card__subtitle',
        'job_locations': 'div[type="location"]',
        'job_postings': 'div[type="calendar"]'
    }))
    return climate_base_jobs


def get_climate_people_jobs(page):
    climate_people_jobs = []
    url = f'https://www.climatepeople.com/jobs?1adb951e_page={page}'
    climate_people_jobs.extend(build_job_object('climatepeople.com', url, {
        'jobs': '.job-post-cardhomehome',
        'job_links': '.job-card-company-name',
        'job_titles': '.job-card-title',
        'company_names': '.job-card-company-name > div',
        'job_locations': None,
        'job_postings': '.job-card-date'
    }))
    return climate_people_jobs


def get_climate_jobs():
    start = time.perf_counter()
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
    end = time.perf_counter()
    print(f'Retrieved climate jobs in {end - start} seconds')
    return {'count': len(climate_jobs), 'jobs': sorted(climate_jobs, key=lambda d: d['posted'], reverse=True)}
