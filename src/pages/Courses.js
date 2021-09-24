import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseData } from 'src/stores/courses/actions';
import { isEmpty, isArray } from 'lodash';
// material
import { Container, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// components
import Page from '../components/Page';
import {
  ProductSort,
  CoursesList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/courses';
//

// ----------------------------------------------------------------------

export default function CoursesPage() {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const courses = useSelector((state) => state.courses.data);

  useEffect(() => {
    dispatch(fetchCourseData());
  }, []);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  const navigate = useNavigate();

  return (
    <Page title="Dashboard: Courses">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Courses
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/dashboard/courses/new`)}
            style={{ marginTop: 10, width: '100%' }}
          >
            new counrse
          </Button>
        </Stack>
        {!isEmpty(courses) && isArray(courses) && <CoursesList courses={courses} />}

        <ProductCartWidget />
      </Container>
    </Page>
  );
}
