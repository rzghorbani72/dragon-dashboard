/* eslint-disable camelcase */
import { find } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { fetchCategoriesData } from 'src/stores/categories/actions';
import { useDispatch, useSelector } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
// material
import {
  Card,
  Table,
  Stack,
  TableBody,
  Container,
  Typography,
  TableContainer
} from '@mui/material';
// components
import InputFields from 'src/components/_dashboard/categories/InputFields';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SingleCategory from '../components/_dashboard/categories/SingleCategory';
import { CategoryListHead, CategoryListToolbar } from '../components/_dashboard/categories';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'id', alignRight: false },
  { id: 'name', label: 'name', alignRight: false },
  { id: 'type', label: 'type', alignRight: false },
  { id: 'parent', label: 'parent', alignRight: false },
  { id: '' },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function Categories() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Category">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
        </Stack>
        <SingleCategory />
        <Card>
          <CategoryListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CategoryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categories.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {isArray(categories) &&
                    categories.map((row) => <InputFields row={row} categories={categories} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
