export interface JobPost {
  id: string;
  source: string;
  href: string;
  companyName: string;
  title: string;
  location: string;
  posted: string;
  lastUpdated: string;
  sectors: string[];
  salary?: string;
}

export interface JobFilters {
  sectors?: string[];
  title?: string;
  location?: string;
  posted?: string;
  source?: string;
}
