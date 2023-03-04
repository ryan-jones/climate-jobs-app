import { Heading, Spinner, Stack } from '@chakra-ui/react';

interface LoadingProps {
  message: string;
}
const Loading = ({ message }: LoadingProps) => {
  return (
    <Stack spacing={4} padding={4} alignItems="center">
      <Spinner />
      <Heading>{message}</Heading>
    </Stack>
  );
};

export default Loading;
