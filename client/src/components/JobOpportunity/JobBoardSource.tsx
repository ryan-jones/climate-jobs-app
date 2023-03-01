import { Flex } from '@chakra-ui/react';
import CompanyLogo from '../Logos/CompanyLogo';

interface JobBoardSourceProps {
  source: string;
}
const JobBoardSource = ({ source }: JobBoardSourceProps) => (
  <Flex justifyContent="flex-end">
    <Flex
      marginRight={1}
      background="lightblue"
      padding={2}
      borderTopRadius="5px"
      width={{ base: '75%', md: '50%' }}
      justifyContent="center"
    >
      <CompanyLogo source={source} />
    </Flex>
  </Flex>
);

export default JobBoardSource;
