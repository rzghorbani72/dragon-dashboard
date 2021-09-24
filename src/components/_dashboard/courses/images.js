import { useState, useEffect } from 'react';
import { isEmpty, isInteger, last } from 'lodash';
// material
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageCropper from 'src/components/imageCrop/imageCropper';
import { Container, Grid, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import api from 'src/config/api';
import { useDispatch } from 'react-redux';
import request from 'src/utils/request';
import { openSnackBar } from 'src/stores/snackbar/reducer';
import { openLoaderAction, closeLoaderAction } from 'src/stores/loader/reducer';
import { errorParserMessage } from 'src/utils/helpers';

export default function Images({ info, fetchCourse, selectedImage, setSelectedImage }) {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadImage] = useState(null);
  const dispatch = useDispatch();

  const uploadImage = async () => {
    if (image) {
      const bodyFormData = new FormData();

      const cimage = new File([image], `courseImage_${new Date()}.jpeg`, {
        type: 'image/jpeg',
        lastModified: new Date(),
        size: 2
      });

      bodyFormData.append('image', cimage);

      bodyFormData.append('title', `${info.title}_image`);
      if (info?.id) bodyFormData.append('courseId', info?.id);
      dispatch(openLoaderAction());
      const uploadedImage = await request('post', api.image.upload(), bodyFormData, {
        'Content-Type': 'multipart/form-data'
      });
      if (uploadedImage.status_name !== 'error') {
        fetchCourse();
        dispatch(closeLoaderAction());
        setUploadImage(uploadedImage.data.details);
        dispatch(openSnackBar('course image uploaded', 'success'));
      } else {
        const message = errorParserMessage(uploadedImage);
        dispatch(closeLoaderAction());
        dispatch(openSnackBar(JSON.stringify(message), 'error'));
      }
    }
  };
  const selectImageAsCourseImage = (img) => {
    setSelectedImage(img.uid);
  };
  const resetImageCropper = () => setImage(null);
  const permanentlyDeleteImage = async (item) => {
    const deleteRes = await request('delete', api.image.deleteOne(item.uid));
    if (deleteRes.status === 200) {
      fetchCourse();
      dispatch(openSnackBar('deleted', 'success'));
    } else {
      dispatch(
        openSnackBar(
          deleteRes.response.data.message
            ? deleteRes.response.data.message
            : deleteRes.response.data.name,
          'error'
        )
      );
    }
  };
  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent="center">
        {!isEmpty(info.files) &&
          info.files.map((item, key) => (
            <Grid
              item
              lg={3}
              xs={6}
              key={key}
              spacing={2}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <img
                src={api.image.getOne(item.uid)}
                alt={info.title}
                height="200"
                width="auto"
                style={{ margin: 10 }}
              />
              <Grid container style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  style={selectedImage === item.uid ? { color: orange[800] } : {}}
                  onClick={() => selectImageAsCourseImage(item)}
                >
                  {item?.uid} {selectedImage === item.uid && <CheckIcon />}
                </Button>
                {selectedImage !== item.uid && (
                  <DeleteForeverIcon
                    sx={{ color: orange[500] }}
                    fontSize="medium"
                    onClick={() => permanentlyDeleteImage(item)}
                  />
                )}
              </Grid>
            </Grid>
          ))}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: 30 }}>
        <Grid item>
          <Stack spacing={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ImageCropper size={290} image={image} setImage={setImage} />
          </Stack>
          {image && (
            <Button
              variant="contained"
              onClick={uploadImage}
              style={{ marginTop: 10, width: '100%' }}
            >
              Upload Image
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={resetImageCropper}
            style={{ marginTop: 10, width: '100%' }}
          >
            Reset Image
          </Button>
          {uploadedImage && image && (
            <Button
              variant="outlined"
              style={{ marginTop: 10, width: '100%' }}
              onClick={() => selectImageAsCourseImage(uploadedImage)}
            >
              {uploadedImage.uid}
              {selectedImage === uploadedImage?.uid ? <CheckIcon /> : ''}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
