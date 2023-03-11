import requests
import datetime
from dateutil import parser
import re
from bs4 import BeautifulSoup


def format_climate_base_date_to_timestamp(match):
    try:
        # second group of CLIMATE_BASE_PATTERN regex pattern: \d
        num = int(match.group(2))

        # third group of CLIMATE_BASE_PATTERN regex pattern: (days|hours|weeks|months)
        unit = match.group(3)
        if unit == 'months':
            delta = datetime.timedelta(months=num)
        elif unit == 'days':
            delta = datetime.timedelta(days=num)
        else:
            delta = datetime.timedelta(hours=num)
        timestamp = datetime.datetime.now(datetime.timezone.utc) - delta
        return timestamp
    except TypeError as error:
        print(f'TypeError raised for {num} {unit}', error)
        raise error


CLIMATE_BASE_PATTERN = r"^(about )?(\d+) (day|hour|week|month|minute|second)s? ago$"


def format_posting(date_string):
    try:
        dt = parser.parse(date_string)
        return dt.astimezone(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f %Z")
    except ValueError:
        matches_climate_base_pattern = re.match(
            CLIMATE_BASE_PATTERN, date_string)
        if (matches_climate_base_pattern):
            timestamp = format_climate_base_date_to_timestamp(
                matches_climate_base_pattern)
            return timestamp
        print(f'no matching pattern for {date_string}')
        return date_string
    except TypeError as error:
        print(f'TypeError raised for {date_string}', error)
        raise error
