import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, isArray, map } from 'lodash';
// material
import Image from 'src/components/_dashboard/courses/images';
import InputFields from 'src/components/_dashboard/courses/inputFields';
import { Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import request from 'src/utils/request';
import api from 'src/config/api';
// components
import { useDispatch } from 'react-redux';
import { fetchCategoriesData } from 'src/stores/categories/actions';
import { openSnackBar } from 'src/stores/snackbar/reducer';
import { openLoaderAction, closeLoaderAction } from 'src/stores/loader/reducer';
import { errorParserMessage } from 'src/utils/helpers';
// ----------------------------------------------------------------------

export default function SingleCourse() {
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(info?.imageId || null);
  const { id } = useParams();
  const fetchCourse = async () => {
    const courseData = await request('get', api.course.getOne(id));
    if (courseData.status === 200) {
      const backSource = courseData.data.details;
      const {
        id,
        title,
        description,
        language,
        primary_price,
        price,
        order,
        level,
        files,
        selected_image_uid,
        featured_order,
        featured,
        is_active
      } = backSource;

      const frontSource = {
        id,
        title,
        description,
        language,
        primary_price,
        price,
        order,
        level,
        files,
        imageId: selected_image_uid,
        featured_order,
        featured,
        is_active,
        category_ids: map(backSource.category, 'id')
      };
      setSelectedImage(selected_image_uid);
      setInfo({ ...frontSource });
    }
  };
  const makeInfoReady = () => {
    const frontSource = {
      title: '',
      description: '',
      language: 'fa',
      primary_price: 0,
      price: 0,
      order: 0,
      level: 'Novice',
      imageId: '',
      featured_order: 0,
      featured: false,
      is_active: true,
      category_ids: [1]
    };
    setInfo({ ...frontSource });
  };
  useEffect(() => {
    if (id !== 'new') fetchCourse();
    else makeInfoReady();
    dispatch(fetchCategoriesData());
  }, []);
  const submitHandler = async () => {
    dispatch(openLoaderAction());
    const data = { ...info };
    const method = data?.id ? 'put' : 'post';
    const apiCall = data?.id ? api.course.update(data.id) : api.course.create();
    const mode = data?.id ? 'update' : 'create';
    if (isArray(data.category_ids)) data.category_ids = data.category_ids.join(',');
    if (data.id) {
      delete data.id;
      delete data.files;
    }
    if (selectedImage) data.imageId = selectedImage;
    const creatResponse = await request(method, apiCall, data);
    dispatch(closeLoaderAction());

    if (creatResponse.status_name !== 'error') {
      if (mode === 'update') fetchCourse();
      dispatch(openSnackBar(`course ${mode}d successfully`, 'success'));
    } else {
      const message = errorParserMessage(creatResponse);
      dispatch(openSnackBar(JSON.stringify(message), 'error'));
    }
  };
  return (
    <Container>
      <Image
        info={info}
        fetchCourse={fetchCourse}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <InputFields info={info} setInfo={setInfo} selectedImage={selectedImage} />
      <Grid item justifyContent="center" style={{ display: 'flex' }}>
        <Button variant="contained" onClick={submitHandler} style={{ width: 250, height: 60 }}>
          {info?.id ? 'Update' : 'Create'} Course
        </Button>
      </Grid>
    </Container>
  );
}
