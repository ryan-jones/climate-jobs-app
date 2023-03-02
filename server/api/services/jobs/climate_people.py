from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from api.services.jobs.utils import format_posting


def build_job_object(url):
    source = urlparse(url).netloc
    climate_jobs = []
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.select('.job-post-cardhomehome')

    for job in jobs:
        job_link = job.select_one('.job-card-company-name')
        job_title = job.select_one('.job-card-title')
        sectors = [x.getText()
                   for x in job.select('.job-card-company-name > div')]
        job_posting = job.select_one('.job-card-date')
        climate_jobs.append({
            'source': source,
            'href': f"https://{source}{job_link.get('href', None)}",
            'title': job_title.getText(),
            'company': 'Unknown',
            'location': None,
            'posted': format_posting(job_posting.getText().strip()),
            'salary': None,
            'sectors': sectors
        })
    return climate_jobs


def get_climate_people_jobs(page):
    climate_people_jobs = []
    url = f'https://www.climatepeople.com/jobs?1adb951e_page={page}'
    climate_people_jobs.extend(build_job_object(url))
    return climate_people_jobs
