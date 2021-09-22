import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseData } from 'src/stores/courses/actions';
import { isEmpty, isArray } from 'lodash';
// material
import { Container, Stack, Typography } from '@mui/material';
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
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        {!isEmpty(courses) && isArray(courses) && <CoursesList courses={courses} />}

        <ProductCartWidget />
      </Container>
    </Page>
  );
}
