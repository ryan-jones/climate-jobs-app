import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import JobLocation from './JobLocation';
import CompanyLogo from './Logos/CompanyLogo';
import { JobPost } from '../types/jobs';
import { truncate } from '../utils/strings';
import { formatTimestamp } from '../utils/dates';

interface JobOpportunityProps {
  job: JobPost;
}
const JobOpportunity = ({ job }: JobOpportunityProps) => (
  <LinkBox>
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
    <Card minHeight="215px">
      <CardHeader>
        <Flex justifyContent={'space-between'}>
          <LinkOverlay href={job.href} isExternal maxWidth="50%">
            <Heading size="md">{truncate(job.title)}</Heading>
          </LinkOverlay>
          <Text>Posted {formatTimestamp(job.posted)}</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack spacing={4} divider={<StackDivider />}>
          <HStack divider={<StackDivider />} alignItems="flex-end">
            <Heading size="xs">{job.companyName}</Heading>
            {job.location && <JobLocation location={job.location} />}
            {job.salary && <Text fontSize="sm">{job.salary}</Text>}
          </HStack>
          <HStack justifyContent="flex-end">
            {job.sectors.map((sector) => (
              <Badge variant="outline" padding={2}>
                {sector}
              </Badge>
            ))}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  </LinkBox>
);

export default JobOpportunity;
