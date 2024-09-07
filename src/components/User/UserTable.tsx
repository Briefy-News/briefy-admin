import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useChangeRole, useDeleteUser, useGetUsers } from 'src/hooks/query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { roleName, Roles, User } from 'src/types/user';
import { TablePagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import DialogModal, { DialogModalProps } from 'src/components/common/DialogModal';

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
  const { data, isLoading } = useGetUsers({ page: page + 1, take });
  const { deleteUserMutation } = useDeleteUser({ page, take });
  const { changeRoleMutation } = useChangeRole({ page, take });

  const changePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const changeTake = (event: ChangeEvent<HTMLInputElement>) => {
    setTake(+event.target.value);
    setPage(0);
  };

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogModalProps, setDialogModalProps] = useState<Pick<DialogModalProps, 'title' | 'description' | 'onConfirm'>>({ title: '', onConfirm: () => {} });

  const deleteUser = (id: number) => {
    setIsOpenDialog(true);
    setDialogModalProps({ title: '계정을 삭제하시겠습니까?', description: '삭제하시면 다시 복구할 수 없습니다.', onConfirm: () => deleteUserMutation.mutate(id) });
  };
  const changeRole = (user: User) => {
    setIsOpenDialog(true);
    const role = user.role === Roles.ADMIN ? roleName[Roles.USER] : roleName[Roles.ADMIN];
    setDialogModalProps({ title: `권한을 ${role}로 변경하시겠습니까?`, onConfirm: () => changeRoleMutation.mutate({ id: user.id, role: user.role }) });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TableContainer sx={{ minWidth: 700, maxWidth: 800, width: '100%' }} component={Paper}>
        <Table sx={{ minWidth: 700, maxWidth: 800, width: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">NAME</StyledTableCell>
              <StyledTableCell align="center">EMAIL</StyledTableCell>
              <StyledTableCell align="center">CREATE AT</StyledTableCell>
              <StyledTableCell align="center">ROLE</StyledTableCell>
              <StyledTableCell align="right">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row: User) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{dayjs(row.createAt).format('YYYY.MM.DD')}</StyledTableCell>
                <StyledTableCell onClick={() => changeRole(row)} align="center" className="cursor-pointer">{roleName[row.role]}</StyledTableCell>
                <StyledTableCell onClick={() => deleteUser(row.id)} align="right" className="cursor-pointer">계정삭제</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.total && (data?.total > take) && (
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
      <DialogModal
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        {...dialogModalProps}
      />
    </>
  );
}

export default UserTable;
