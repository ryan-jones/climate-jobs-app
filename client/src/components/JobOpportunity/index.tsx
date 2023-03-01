import {
  Badge,
  Card,
  CardBody,
  Heading,
  Hide,
  HStack,
  LinkBox,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import JobLocation from '../JobLocation';
import { JobPost } from '../../types/jobs';
import JobBoardSource from './JobBoardSource';
import JobOpportunityHeader from './JobOpportunityHeader';

interface JobOpportunityProps {
  job: JobPost;
}
const JobOpportunity = ({ job }: JobOpportunityProps) => (
  <LinkBox>
    <JobBoardSource source={job.source} />
    <Card>
      <JobOpportunityHeader {...job} />
      <CardBody>
        <Stack spacing={4} divider={<StackDivider />}>
          <>
            <HStack divider={<StackDivider />} alignItems="flex-end">
              <Heading size="xs">{job.companyName}</Heading>
              {job.location && <JobLocation location={job.location} />}
              {job.salary && (
                <Hide below="md">
                  <Text fontSize="sm">{job.salary}</Text>
                </Hide>
              )}
            </HStack>
            <Hide above="md">
              {job.salary && <Text fontSize="sm">{job.salary}</Text>}
            </Hide>
          </>
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
