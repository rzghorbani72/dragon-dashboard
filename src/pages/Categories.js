/* eslint-disable camelcase */
import { find } from 'lodash';
import { Icon } from '@iconify/react';

import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { fetchCategoriesData } from 'src/stores/categories/actions';
import { useDispatch, useSelector } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import {
  CategoryListHead,
  CategoryListToolbar,
  CategoryMoreMenu
} from '../components/_dashboard/categories';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'id', alignRight: false },
  { id: 'name', label: 'name', alignRight: false },
  { id: 'parent', label: 'parent', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function Categories() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    <Page title="Category | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Category
          </Button>
        </Stack>

        <Card>
          <CategoryListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CategoryListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categories.lengtth}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {!isEmpty(categories) &&
                    isArray(categories) &&
                    categories.map((row) => {
                      const { id, name, parent_id, createdAt } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      const parent = find(categories, { id: parent_id })
                        ? find(categories, { id: parent_id }).name
                        : 'is parent';
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={4}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell justifyContent="center">
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {parent}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left" justifyContent="center">
                            {createdAt}
                          </TableCell>

                          <TableCell align="right">
                            <CategoryMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
