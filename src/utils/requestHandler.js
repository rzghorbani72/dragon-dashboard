import request from 'src/utils/request';
import { openSnackBar } from 'src/stores/snackbar/reducer';
import { openLoaderAction, closeLoaderAction } from 'src/stores/loader/reducer';
import { errorParserMessage } from 'src/utils/helpers';

export default async ({
  method,
  apiCall,
  body = {},
  header = { 'Content-Type': 'application/json' },
  successAction = null,
  dispatch,
  fn = null
}) => {
  dispatch(openLoaderAction());
  let action = '';
  if (apiCall.includes('create')) action = 'created';
  if (apiCall.includes('update')) action = 'updated';
  if (apiCall.includes('delete')) action = 'deleted';
  if (apiCall.includes('login')) action = 'logged In';

  if (header['Content-Type'] === 'multipart/form-data') action = 'uploaded';
  const creatResponse = await request(method, apiCall, body, header);
  dispatch(closeLoaderAction());

  if (creatResponse.status_name !== 'error') {
    if (successAction) dispatch(successAction());
    if (fn) fn();
    if (method !== 'get') dispatch(openSnackBar(`${action} successfully`, 'success'));
  } else {
    const message = errorParserMessage(creatResponse);
    dispatch(openSnackBar(JSON.stringify(message), 'error'));
  }
};
