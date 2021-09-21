import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function Categories() {
  return (
    <Page title="Dashboard: Orders">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Orders
        </Typography>
      </Container>
    </Page>
  );
}
