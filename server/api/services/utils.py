import requests
from datetime import datetime, date

from bs4 import BeautifulSoup


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
    job_locations = soup.select(
        job_dict['job_locations']) if job_dict['job_locations'] else None
    job_postings = soup.select(job_dict['job_postings'])
    salaries = soup.select(job_dict['salary']) if job_dict['salary'] else None
    for index, job in enumerate(jobs):
        climate_jobs.append({
            'source': source,
            'href': f"{source}{job_links[index].get('href', None)}",
            'title': job_titles[index].getText(),
            'company': company_names[index].getText(),
            'location': job_locations[index].getText().strip() if job_locations else None,
            'posted': format_posting(job_postings[index].getText().strip()),
            'salary': salaries[index].getText() if salaries and index < len(salaries) else None,
            'industries': job_dict['industries']()
        })
    return climate_jobs
