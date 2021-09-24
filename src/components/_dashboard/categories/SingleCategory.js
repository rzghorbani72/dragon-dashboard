import { useState, useEffect } from 'react';
import { isArray, find } from 'lodash';
// material
import { Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import api from 'src/config/api';
// components
import { styled } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesData } from 'src/stores/categories/actions';
import requestHandler from 'src/utils/requestHandler';

export default function SingleCourse() {
  const [info, setInfo] = useState({ name: '', type: 'category', parent_id: 0 });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, []);

  const submitHandler = async () => {
    const data = { name: info.name, type: info.type, parent_id: info.parent_id };
    await requestHandler({
      method: 'post',
      apiCall: api.category.create(),
      body: { ...data },
      dispatch,
      successAction: fetchCategoriesData
    });
  };

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
  return (
    <Container>
      <Grid
        container
        justifyContent="space-between"
        spacing={4}
        style={{ display: 'flex', marginBottom: 20 }}
      >
        <Grid item lg={4}>
          <MyTextField
            id="name"
            name="name"
            label="category name"
            variant="outlined"
            value={info.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={3}>
          <MyFormControl fullWidth>
            <InputLabel id="demo-simple-select-label">type</InputLabel>
            <MySelect
              labelId="demo-simple-select-label"
              id="type"
              name="type"
              value={info.type}
              label="type"
              onChange={handleChange}
            >
              {['category', 'episode'].map((cat, key) => (
                <MenuItem key={key} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </MySelect>
          </MyFormControl>
        </Grid>
        <Grid item lg={3}>
          <MyFormControl fullWidth>
            <InputLabel id="demo-simple-select-label">parent</InputLabel>
            <MySelect
              labelId="demo-simple-select-label"
              id="parent_id"
              name="parent_id"
              value={findCategoryNameById(info.parent_id)}
              label="parent"
              onChange={handleChange}
            >
              {isArray(categories) &&
                [...categories, { id: 0, name: 'is parent' }].map((cat, key) => (
                  <MenuItem key={key} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
            </MySelect>
          </MyFormControl>
        </Grid>
        <Grid item lg={2}>
          <Button variant="contained" onClick={submitHandler} style={{ height: 50 }}>
            Create Category
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
const MyTextField = styled(TextField)({
  width: '100%'
});

const MySelect = styled(Select)({
  width: '100%'
});

const MyFormControl = styled(FormControl)({
  width: '100%'
});
