import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, last } from 'lodash';
// material
import Image from 'src/components/_dashboard/courses/images';
import { Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import request from 'src/utils/request';
import api from 'src/config/api';
// components
// ----------------------------------------------------------------------

export default function SingleCourse() {
  const [info, setInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(info?.selected_image_uid || null);
  const { id } = useParams();
  const fetchCourse = async () => {
    const courseData = await request('get', api.course.getOne(id));
    if (courseData.status === 200) {
      setInfo(courseData.data.details);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchCourse();
    })();
  }, []);

  return (
    <Container>
      <Image
        info={info}
        fetchCourse={fetchCourse}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </Container>
  );
}
