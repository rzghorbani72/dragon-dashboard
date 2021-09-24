import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackBar } from 'src/stores/snackbar/reducer';
// COMPONENTS
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function SnackBar() {
  const snackbar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(closeSnackBar()), []);

  // return (
  //   <Snackbar open={snackbar.isOpen} autoHideDuration={3000} onClose={handleClose}>
  //     <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
  //       {snackbar.msg}
  //     </Alert>
  //   </Snackbar>
  // );
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={snackbar.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={snackbar.msg}
    >
      {snackbar.severity ? (
        <MuiAlert
          onClose={handleClose}
          severity={snackbar.severity || 'info'}
          elevation={9}
          variant="filled"
        >
          {snackbar.msg}
        </MuiAlert>
      ) : null}
    </Snackbar>
  );
}

export default SnackBar;
