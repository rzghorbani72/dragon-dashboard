/* eslint-disable camelcase */
import { find } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { fetchCategoriesData } from 'src/stores/categories/actions';
import { useDispatch, useSelector } from 'react-redux';

// material
import { Stack, Button, TableRow, TableCell, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import request from 'src/utils/request';

// components

import { openSnackBar } from 'src/stores/snackbar/reducer';
import { openLoaderAction, closeLoaderAction } from 'src/stores/loader/reducer';
import { errorParserMessage } from 'src/utils/helpers';
import { CategoryMoreMenu } from 'src/components/_dashboard/categories';
import api from 'src/config/api';
//

export default function InputFields({ row, categories }) {
  const [info, setInfo] = useState(row);
  const dispatch = useDispatch();

  const findCategoryNameById = (id) => {
    if (id === 0) return 'is parent';
    const foundCat = find(categories, { id });
    if (foundCat) return foundCat.name;
  };

  const findCategoryIdByName = (name) => {
    if (name === 'is parent') return 0;
    const foundCat = find(categories, { name });
    if (foundCat) return foundCat.id;
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (e.target.name === 'parent_id') {
      newValue = findCategoryIdByName(e.target.value);
    }
    setInfo((info) => ({ ...info, [e.target.name]: newValue }));
  };

  const update = async () => {
    const { name, parent_id, type } = info;
    dispatch(openLoaderAction());
    const creatResponse = await request('put', api.category.update(info.id), {
      name,
      parent_id,
      type
    });
    dispatch(closeLoaderAction());

    if (creatResponse.status_name !== 'error') {
      dispatch(fetchCategoriesData());
      dispatch(openSnackBar(`category updated successfully`, 'success'));
    } else {
      const message = errorParserMessage(creatResponse);
      dispatch(openSnackBar(JSON.stringify(message), 'error'));
    }
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
          <Typography variant="subtitle2" noWrap>
            {info.id}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <TextField id="name" name="name" label="name" onChange={handleChange} value={info.name} />
        </Stack>
      </TableCell>

      <TableCell justifyContent="center">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="type"
              name="type"
              value={info.type}
              label="type"
              onChange={handleChange}
            >
              {['category', 'episode'].map((cat) => (
                <MenuItem value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </TableCell>
      <TableCell justifyContent="center">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">parent</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="parent"
              name="parent_id"
              value={findCategoryNameById(info.parent_id)}
              label="parent"
              onChange={handleChange}
            >
              {[...categories, { id: 0, name: 'is parent' }].map((cat) => (
                <MenuItem value={cat.name}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </TableCell>
      <TableCell align="left" justifyContent="center">
        <Button variant="outlined" onClick={update} style={{ height: 50 }}>
          Update
        </Button>
      </TableCell>

      <TableCell align="right">
        <CategoryMoreMenu />
      </TableCell>
    </TableRow>
  );
}
