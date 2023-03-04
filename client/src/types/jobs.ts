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
  companyName?: string;
  offset?: number;
}

export type SelectedFilterOptions = {
  filters: Partial<
    Record<
      keyof Omit<JobFilters, 'offset'>,
      { value: any; queryString: string }
    >
  >;
  offset: number;
};

export type JobFilterQueryValues = Partial<Record<keyof JobFilters, any>>;
