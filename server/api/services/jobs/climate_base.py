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
    job_links = soup.select('.list_card')
    job_titles = soup.select('.list_card__title')
    company_names = soup.select('.list_card__subtitle')
    job_locations = soup.select(
        'div[type="location"]')
    job_postings = soup.select('div[type="calendar"]')

    for index, job in enumerate(jobs):
        sectors = [x.getText()
                   for x in jobs[index].select('.list_card__tag')]
        salary = jobs[index].select_one(
            '.MetadataInfo__SalaryContainer-hif7kv-0')

        climate_jobs.append({
            'source': source,
            'href': f"{source}{job_links[index].get('href', '')}",
            'title': job_titles[index].getText(),
            'company': company_names[index].getText(),
            'location': job_locations[index].getText().strip() if job_locations else None,
            'posted': format_posting(job_postings[index].getText().strip()),
            'salary': salary.getText() if salary else None,
            'sectors': sectors
        })
    return climate_jobs


def get_climate_base_jobs(page):
    climate_base_jobs = []
    url = f'https://www.climatebase.org/jobs?l=&q=&p={page}&remote=false'
    climate_base_jobs.extend(build_job_object(url))
    return climate_base_jobs
