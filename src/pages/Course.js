import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import SingleCourse from '../components/_dashboard/courses/SingleCourse';

// ----------------------------------------------------------------------

export default function Course() {
  return (
    <Page title="Dashboard: Course">
      <Container>
        <SingleCourse />
      </Container>
    </Page>
  );
}
