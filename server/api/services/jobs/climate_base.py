from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from api.services.jobs.utils import format_posting


def build_job_object(url):
    source = f'https://{urlparse(url).netloc}'
    climate_jobs = []
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    jobs = soup.select('.list_card')

    for job in jobs:
        sectors = [x.getText()
                   for x in job.select('.list_card__tag')]
        salary = job.select_one(
            '.MetadataInfo__SalaryContainer-hif7kv-0')
        title = job.select_one('.list_card__title')
        company_name = job.select_one('.list_card__subtitle')
        job_location = job.select_one(
            'div[type="location"]')
        job_posting = job.select_one('div[type="calendar"]')

        climate_jobs.append({
            'source': source,
            'href': f"{source}{job.get('href', '')}",
            'title': title.getText() if title else None,
            'company': company_name.getText() if company_name else None,
            'location': job_location.getText().strip() if job_location else None,
            'posted': format_posting(job_posting.getText().strip()) if job_posting else None,
            'salary': salary.getText() if salary else None,
            'sectors': sectors
        })
    return climate_jobs


def get_climate_base_jobs(page):
    climate_base_jobs = []
    url = f'https://www.climatebase.org/jobs?l=&q=&p={page}&remote=false'
    climate_base_jobs.extend(build_job_object(url))
    return climate_base_jobs
