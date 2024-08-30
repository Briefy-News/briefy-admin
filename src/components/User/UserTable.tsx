import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetUsers } from 'src/hook/query';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { roleName, User } from 'src/types/user';
import { TablePagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#33409f',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f7f8ff',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function UserTable() {
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(10);
  const { data, isLoading, isError } = useGetUsers({ page: page + 1, take });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/signin" />;

  const changePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const changeTake = (event: ChangeEvent<HTMLInputElement>) => {
    setTake(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">NAME</StyledTableCell>
              <StyledTableCell align="center">EMAIL</StyledTableCell>
              <StyledTableCell align="center">CREATE AT</StyledTableCell>
              <StyledTableCell align="right">ROLE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row: User) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{dayjs(row.createAt).format('YYYY.MM.DD')}</StyledTableCell>
                <StyledTableCell align="right">{roleName[row.role]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.total > take && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={data.total}
          rowsPerPage={take}
          page={page}
          onPageChange={changePage}
          onRowsPerPageChange={changeTake}
        />
      )}
    </>
  );
}

export default UserTable;
