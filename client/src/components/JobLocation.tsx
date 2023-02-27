import { Badge } from '@chakra-ui/react';

interface JobLocationProps {
  location: string;
}
const JobLocation = ({ location }: JobLocationProps) => {
  if (location.toLowerCase() === 'remote') {
    return <Badge colorScheme="green">Remote</Badge>;
  }

  return <Badge variant="outline">{location}</Badge>;
};

export default JobLocation;
