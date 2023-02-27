import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import JobLocation from './JobLocation';
import CompanyLogo from './Logos/CompanyLogo';
import { JobPost } from '../types/jobs';

interface JobOpportunityProps {
  job: JobPost;
}
const JobOpportunity = ({ job }: JobOpportunityProps) => (
  <Box>
    <Flex justifyContent="flex-end">
      <Flex
        marginRight={1}
        background="lightblue"
        padding={2}
        borderTopRadius="5px"
        width="50%"
        justifyContent="center"
      >
        <CompanyLogo source={job.source} />
      </Flex>
    </Flex>
    <Card>
      <CardHeader>
        <Flex>
          <Heading size="md">{job.title}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <HStack divider={<StackDivider />} alignItems="flex-end">
          <Heading size="xs">{job.company}</Heading>
          {job.location && <JobLocation location={job.location} />}
          {job.salary && <Text fontSize="sm">{job.salary}</Text>}
        </HStack>
      </CardBody>
    </Card>
  </Box>
);

export default JobOpportunity;
