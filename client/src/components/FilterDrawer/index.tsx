import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import Filters from '../Filter';
import { SelectedFilterOptions } from '../../types/jobs';

interface FilterDrawerProps {
  onClearFilters: () => void;
  queryFilters: SelectedFilterOptions;
  setQueryFilters: React.Dispatch<React.SetStateAction<SelectedFilterOptions>>;
}
const FilterDrawer = ({
  queryFilters,
  setQueryFilters,
  onClearFilters,
}: FilterDrawerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <>
      <Button ref={btnRef} backgroundColor="lightblue" onClick={onOpen}>
        Filter Results
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <Filters
              onClearFilters={onClearFilters}
              queryFilters={queryFilters}
              setQueryFilters={setQueryFilters}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
