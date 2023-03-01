from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from api.services.jobs.utils import format_posting


def build_job_object(url):
    source = f'https://{urlparse(url).netloc}'
    climate_jobs = []
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.select('.job-post-cardhomehome')
    job_links = soup.select('.job-card-company-name')
    job_titles = soup.select('.job-card-title')
    sectors = soup.select('.job-card-company-name > div')
    job_postings = soup.select('.job-card-date')
    for index, job in enumerate(jobs):
        climate_jobs.append({
            'source': source,
            'href': f"{source}{job_links[index].get('href', None)}",
            'title': job_titles[index].getText(),
            'company': 'Unknown',
            'location': None,
            'posted': format_posting(job_postings[index].getText().strip()),
            'salary': None,
            'sectors': [sectors[index].getText()]
        })
    return climate_jobs


def get_climate_people_jobs(page):
    climate_people_jobs = []
    url = f'https://www.climatepeople.com/jobs?1adb951e_page={page}'
    climate_people_jobs.extend(build_job_object(url))
    return climate_people_jobs
