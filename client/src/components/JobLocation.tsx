import { Badge } from '@chakra-ui/react';

interface JobLocationProps {
  location: string;
}
const JobLocation = ({ location }: JobLocationProps) => {
  if (location.toLowerCase() === 'remote') {
    return <Badge colorScheme="green">{location}</Badge>;
  }

  return <Badge variant="subtle">{location}</Badge>;
};

export default JobLocation;
