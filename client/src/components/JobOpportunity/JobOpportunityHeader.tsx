import {
  CardHeader,
  Heading,
  HStack,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { JobPost } from '../../types/jobs';
import { formatTimestamp } from '../../utils/dates';
import { truncate } from '../../utils/strings';

const JobOpportunityHeader = ({ href, title, posted }: JobPost) => (
  <CardHeader minHeight="120px">
    <HStack
      justifyContent={'space-between'}
      spacing={4}
      alignItems="flex-start"
    >
      <LinkOverlay href={href} isExternal>
        <Heading size="md">{truncate(title)}</Heading>
        <Text as="i" fontSize="sm">
          Posted {formatTimestamp(posted)}
        </Text>
      </LinkOverlay>
    </HStack>
  </CardHeader>
);

export default JobOpportunityHeader;
