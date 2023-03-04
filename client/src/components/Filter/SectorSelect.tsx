import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import useGetSectors from '../../hooks/useGetSectors';
import { SelectedFilterOptions } from '../../types/jobs';
import { queryFormatter } from '../../utils/queries';

interface SectorSelectProps {
  queryFilters: SelectedFilterOptions;
  setQueryFilters: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
}
const SectorSelect = ({ setQueryFilters, queryFilters }: SectorSelectProps) => {
  const { sectors } = useGetSectors();

  return (
    <FormControl>
      <FormLabel>Sectors</FormLabel>
      <Select
        useBasicStyles
        isMulti
        placeholder="E.g. 'Energy'"
        value={queryFilters?.filters.sectors?.value}
        options={sectors.map((sector) => ({
          label: sector.name,
          value: sector.id,
        }))}
        onChange={(selected) => {
          setQueryFilters((prev) =>
            queryFormatter(prev, {
              sectors: {
                value: selected,
                queryString: JSON.stringify(
                  selected.map((sector) => sector.value)
                ),
              },
            })
          );
        }}
      />
    </FormControl>
  );
};

export default SectorSelect;
