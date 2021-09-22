/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { mockImgCover } from 'src/utils/mockImages';

// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const CourseImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CourseCard.propTypes = {
  course: PropTypes.object
};

export default function CourseCard({ course }) {
  const { id, title, primary_price, price } = course;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <CourseImgStyle alt={title} src={mockImgCover(id)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          {/* <Typography variant="subtitle1" justifyContent="space-evenly"> */}
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: 'text.disabled',
              textDecoration: 'line-through'
            }}
          >
            {primary_price && fCurrency(primary_price)}
          </Typography>
          &nbsp;
          <Typography component="span">{fCurrency(price)}</Typography>
          {/* </Typography> */}
        </Stack>
      </Stack>
    </Card>
  );
}
