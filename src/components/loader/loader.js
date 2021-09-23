import React from 'react';
import { useSelector } from 'react-redux';
// COMPONENTS
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// STYLES
import useStyles from './loader.style';

function Loader(props) {
  const classes = useStyles();
  const loader = useSelector((state) => state.loader);

  return (
    <Backdrop open={loader.isOpen} {...props} className={classes.root}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
