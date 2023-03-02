import { JobFilters } from '../types/jobs';

export default class API {
  static getJobs = async (
    queryParams: Partial<Record<keyof JobFilters, any>> = {}
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/jobs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(queryParams),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await response.json();
      const formattedData = data.map((row: Record<string, any>) => ({
        id: row.id,
        source: row.source,
        href: row.href,
        companyName: row.company_name,
        title: row.title,
        location: row.location,
        salary: row.salary,
        posted: row.posted,
        sectors: row.sectors,
        lastUpdated: row.last_updated,
      }));

      return formattedData;
    } catch (error) {
      throw error;
    }
  };

  static getSectors = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/sectors`
      );

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
}
