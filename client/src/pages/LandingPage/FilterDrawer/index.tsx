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
import Filters from '../../../components/Filter';
import { JobFilterQueryValues } from '../../../types/jobs';

interface FilterDrawerProps {
  onSubmitQueryWithFilters: (queryParams: JobFilterQueryValues) => void;
}
const FilterDrawer = ({ onSubmitQueryWithFilters }: FilterDrawerProps) => {
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
            <Filters onSubmitQueryWithFilters={onSubmitQueryWithFilters} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
