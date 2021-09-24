/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import isBase64 from 'is-base64';
import { openSnackBar } from 'src/stores/snackbar/reducer';
import { IMAGE_EXTs } from 'src/config/constants';
import { validateImageFile } from 'src/utils/helpers';
import { compressImage } from 'src/utils/imageCompression';

// COMPONENTS
// import ReactCrop from 'react-image-crop';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// ICONS
import CloseIcon from '@mui/icons-material/Close';
// STYLES
import 'react-image-crop/dist/ReactCrop.css';
import './cropStyle.css';
import { useStyles } from './styles';
import getCroppedImg from './crop-image';

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

function ImageDrop({ size = 250, image = null, setImage, openSnackBar }) {
  const classes = useStyles({ size });

  const [upImage, setUpImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(image || null);

  useEffect(() => {
    if (image === null) setUpImage(null);
  }, [image]);
  // Dropzone functions
  const onDrop = useCallback((files) => {
    const file = files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const { result } = event.target;
      if (isBase64(result, { allowMime: true }) && upImage !== result) {
        setUpImage(result);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Easy Crop functions
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = await compressImage(e.target.files[0]);
      const validationMsg = validateImageFile(file);

      if (validationMsg) return openSnackBar(validationMsg, 'info');

      const imageDataUrl = await readFile(file);
      setUpImage(imageDataUrl);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(upImage, croppedAreaPixels, rotation);

      setCroppedImage(croppedImage.link);
      setImage(croppedImage.blob);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image, setImage]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
    setImage('');
  }, []);

  return (
    <div className={classes.cropperRoot}>
      <div className={classes.dropWrapper}>
        {!upImage && (
          <div
            className={classes.dropBox}
            {...getRootProps()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className={classes.dpZoneLabel}>
              <Typography variant="body1" gutterBottom>
                {' '}
                تصویر محصول{' '}
              </Typography>
              <Typography variant="body1" component="span">
                {' '}
                200{' '}
              </Typography>
              <Typography variant="body1" component="span">
                {' '}
                ✕{' '}
              </Typography>
              <Typography variant="body1" component="span">
                {' '}
                200{' '}
              </Typography>
            </div>

            <Button variant="contained" color="primary">
              آپلود تصویر
            </Button>

            <input {...getInputProps()} accept="image/*" onChange={onFileChange} />
          </div>
        )}
      </div>

      {upImage && (
        <div className={classes.root}>
          <div className={classes.dropBox}>
            {croppedImage && <img src={croppedImage} alt="Cropped" className={classes.img} />}
            <IconButton onClick={onClose} className={classes.clearBtn}>
              <CloseIcon />
            </IconButton>
          </div>
          {upImage && (
            <div className={classes.cropContainer}>
              <Cropper
                image={upImage}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          )}
        </div>
      )}

      <Grid container spacing={1} justify="flex-end">
        {upImage && (
          <>
            <Grid item container wrap="nowrap" spacing={2} alignItems="center">
              <Grid item>
                <Typography>زوم</Typography>
              </Grid>
              <Grid item className={classes.sliderWrapper}>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="زوم"
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                disableElevation
              >
                اعمال
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

const mapDispatchToProps = {
  openSnackBar
};

export default connect(null, mapDispatchToProps)(ImageDrop);
