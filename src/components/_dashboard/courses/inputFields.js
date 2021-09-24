import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import {
  isEmpty,
  isArray,
  find,
  findIndex,
  uniq,
  remove,
  isNumber,
  lastIndexOf,
  isString
} from 'lodash';
// material
import { styled } from '@mui/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useSelector } from 'react-redux';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { formatNumber } from 'src/utils/helpers';
import Button from '@mui/material/Button';
import request from 'src/utils/request';
import api from 'src/config/api';
// components
// ----------------------------------------------------------------------
const inputFields = [
  { name: 'title', fa: 'نام دوره', type: 'text' },
  { name: 'description', fa: 'توضیحات دوره', type: 'text' },
  { name: 'language', fa: 'زبان', type: 'dropdown' },
  { name: 'primary_price', fa: 'قیمت اولیه', type: 'text' },
  { name: 'price', fa: 'قیمت نهایی', type: 'text' },
  { name: 'order', fa: 'ترتیب', type: 'number' },
  { name: 'level', fa: 'سطح', type: 'dropdown' },
  { name: 'featured_order', fa: 'ترتیب پیشنهاد ویژه', type: 'number' },
  { name: 'featured', fa: 'پیشنهاد ویژه', type: 'boolean' },
  { name: 'is_active', fa: 'وضعیت', type: 'boolean' },
  { name: 'category_ids', fa: 'دسته بندی', type: 'dropdown' },
  { name: 'imageId', fa: 'شماره عکس دوره', type: 'string' }
];
export default function SingleCourse({ info, setInfo, selectedImage }) {
  const categories = useSelector((state) => state.categories.data);

  const changeCategoryNameToId = (names) => {
    if (!isEmpty(names) && !isEmpty(categories)) {
      if (isArray(names)) return names.map((name) => find(categories, { name }).id);
      const nameArray = names.split(',');
      return nameArray.map((name) => find(categories, { name }).id).join(',');
    }
    return names;
  };

  const changeCategoryIdToName = (ids) => {
    if (!isEmpty(ids) && !isEmpty(categories)) {
      if (isArray(ids)) return ids.map((id) => find(categories, { id: Number(id) }).name);

      const idsArray = ids.split(',');
      return idsArray.map((id) => find(categories, { id: Number(id) }).name).join(',');
    }
    return ids;
  };
  const priceThousandSeparator = (name, value) => {
    let newValue = value;
    if (['price', 'primary_price'].includes(name)) {
      if (String(newValue).includes(',')) newValue = Number(newValue.replace(/,/g, ''));
      newValue = formatNumber(String(newValue));
    }
    return newValue;
  };
  const handleChange = (e) => {
    setInfo((info) => ({ ...info, [e.target.name]: e.target.value }));
  };

  const handleMultiChange = (event) => {
    let {
      target: { value }
    } = event;
    value = changeCategoryNameToId(value);
    const selectedItem = find(value, (item) => isString(item));
    let currentValues = uniq([...value.filter((item) => isNumber(item))]);

    if (selectedItem) {
      const selectedId = find(categories, { name: selectedItem })?.id;
      if (currentValues.indexOf(selectedId) > -1) {
        currentValues = [...currentValues.filter((item) => item !== selectedId)];
      } else currentValues.push(selectedId);
    }
    value = uniq(currentValues).filter((item) => isNumber(item));
    setInfo((info) => ({ ...info, category_ids: value }));
  };

  return (
    <Grid container justifyContent="center">
      <Box sx={{ width: '70%' }}>
        {!isEmpty(info) &&
          inputFields.map((row, key) => {
            const { name, type } = row;

            if (name === 'category_ids')
              return (
                <MyFormControl fullWidth key={key}>
                  <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                  <MySelect
                    labelId="demo-simple-select-label"
                    id={name}
                    name={name}
                    value={changeCategoryIdToName(info.category_ids)}
                    label="category_ids"
                    onChange={handleMultiChange}
                    multiple
                    renderValue={(selected) => selected.join(',')}
                  >
                    {isArray(categories) &&
                      categories.map((cat, key) => (
                        <MenuItem key={key} value={cat.name}>
                          <Checkbox checked={info.category_ids.indexOf(cat.id) > -1} />
                          <ListItemText primary={cat.name} />
                        </MenuItem>
                      ))}
                  </MySelect>
                </MyFormControl>
              );

            if ((name !== 'category_ids' && type === 'dropdown') || type === 'boolean')
              return (
                <MyFormControl fullWidth key={key}>
                  <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                  <MySelect
                    labelId="demo-simple-select-label"
                    id={name}
                    name={name}
                    value={info[name]}
                    label={name}
                    onChange={handleChange}
                  >
                    {name === 'level' &&
                      ['Novice', 'Intermediate', 'Advanced'].map((cat) => (
                        <MenuItem value={cat}>{cat}</MenuItem>
                      ))}
                    {name === 'language' &&
                      ['fa', 'en', 'dubbed'].map((cat) => <MenuItem value={cat}>{cat}</MenuItem>)}
                    {type === 'boolean' &&
                      ['false', 'true'].map((cat) => <MenuItem value={cat}>{cat}</MenuItem>)}
                  </MySelect>
                </MyFormControl>
              );
            if (name === 'description')
              return (
                <Grid item>
                  <TextareaAutosize
                    minRows={5}
                    placeholder="write description"
                    style={{ width: '100%', margin: 20 }}
                    value={info[name]}
                    name={name}
                    onChange={handleChange}
                  />
                </Grid>
              );

            if (name === 'imageId')
              return (
                <MyTextField
                  key={key}
                  id={name}
                  name={name}
                  label={selectedImage ? '' : name}
                  value={selectedImage}
                  disabled
                />
              );

            return (
              <MyTextField
                key={key}
                id={name}
                name={name}
                label={name}
                variant="outlined"
                value={priceThousandSeparator(name, info[name])}
                onChange={handleChange}
              />
            );
          })}
      </Box>
    </Grid>
  );
}
const MyTextField = styled(TextField)({
  margin: 20,
  width: '100%'
});
const MyFormControl = styled(FormControl)({
  margin: 20
});
const MySelect = styled(Select)({
  width: '100%'
});
