import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function Categories() {
  return (
    <Page title="Dashboard: Categories">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categories
        </Typography>
      </Container>
    </Page>
  );
}
