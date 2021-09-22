import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';

// ----------------------------------------------------------------------

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default function CoursesList({ courses, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {courses.map((course) => (
        <Grid key={course.id} item xs={12} sm={6} md={3}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}
