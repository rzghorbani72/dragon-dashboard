import PropTypes from 'prop-types';
// material
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Stack
} from '@mui/material';

// ----------------------------------------------------------------------

CategoryListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func
};

export default function CategoryListHead({ order, orderBy, headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              color="green"
              spacing={4}
            >
              {headCell.label}
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
