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
import { forwardRef } from 'react';

interface JobOpportunityProps {
  job: JobPost;
}
const JobOpportunity = forwardRef(
  ({ job }: JobOpportunityProps, ref: React.Ref<HTMLDivElement>) => (
    <LinkBox ref={ref}>
      <JobBoardSource source={job.source} />
      <Card>
        <JobOpportunityHeader {...job} />
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            <>
              <HStack divider={<StackDivider />} alignItems="flex-end">
                <Heading size="xs" noOfLines={1}>
                  {job.companyName}
                </Heading>
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
                <Badge variant="outline" padding={2} key={sector}>
                  {sector}
                </Badge>
              ))}
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    </LinkBox>
  )
);

export default JobOpportunity;
