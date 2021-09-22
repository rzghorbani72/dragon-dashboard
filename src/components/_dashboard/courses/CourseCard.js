/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import api from 'src/config/api';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//

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
  const { id, title, primary_price, price, files } = course;
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/dashboard/courses/${id}`)} style={{ cursor: 'pointer' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {isEmpty(files) ? (
          <CourseImgStyle alt={title} src={api.image.getOne('111')} />
        ) : (
          <CourseImgStyle alt={title} src={api.image.getOne(files[0].uid)} />
        )}
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
