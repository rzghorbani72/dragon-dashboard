import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
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

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func
};

export default function UserListHead({ order, orderBy, headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
              {headCell.label}
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
