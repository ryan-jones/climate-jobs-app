import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import useGetSectors from '../../hooks/useGetSectors';
import { FilterOptions } from '../../types/jobs';

interface SectorSelectProps {
  filters: FilterOptions;
  setQueryFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}
const SectorSelect = ({ setQueryFilters, filters }: SectorSelectProps) => {
  const { sectors } = useGetSectors();

  return (
    <FormControl>
      <FormLabel>Sectors</FormLabel>
      <Select
        useBasicStyles
        isMulti
        placeholder="E.g. 'Energy'"
        value={filters?.sectors?.value}
        options={sectors.map((sector) => ({
          label: sector.name,
          value: sector.id,
        }))}
        onChange={(selected) => {
          setQueryFilters((prev) => ({
            ...prev,
            sectors: {
              value: selected,
              queryString: JSON.stringify(
                selected.map((sector) => sector.value)
              ),
            },
          }));
        }}
      />
    </FormControl>
  );
};

export default SectorSelect;
