import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import SingleCourse from '../components/_dashboard/courses/SingleCourse';

// ----------------------------------------------------------------------

export default function Course() {
  return (
    <Page title="Dashboard: Course">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Course :id
        </Typography>
        <SingleCourse />
      </Container>
    </Page>
  );
}
