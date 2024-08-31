import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteOne, changeRole, ChangeRole, getAll } from 'src/api/user';
import useToast from 'src/hook/useToast';
import { FetchUsers, roleName, Roles } from 'src/types/user';

export interface QueryKey {
  page: number;
  take?: number;
}

export const useGetUsers = ({ page, take = 20 } : QueryKey) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users', page, take],
    queryFn: () => getAll({ page, take }),
  });

  return { data, isError, isLoading };
};

export const useChangeRole = ({ page, take }: QueryKey) => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const changeRoleMutation = useMutation({
    mutationFn: ({ id, role }: ChangeRole) => changeRole({ id, role }),
    onSuccess: (res) => {
      successToast(`${roleName[res.role as Roles]}로 변경되었습니다.`);
      queryClient.setQueryData(['users', page + 1, take], (prev: FetchUsers) => {
        const update = prev?.data.map((user) => {
          if (user.id === res.id) return { ...user, role: res.role };
          return user;
        });
        return { ...prev, data: update };
      });
    },
    onError: () => {
      errorToast('권한 변경에 실패했습니다.');
    },
  });

  return {
    changeRoleMutation,
  };
};

export const useDeleteUser = ({ page, take }: QueryKey) => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: (res) => {
      successToast('유저가 삭제되었습니다.');
      queryClient.setQueryData(['users', page + 1, take], (prev: FetchUsers) => {
        const update = prev?.data.filter((user) => user.id !== res);
        return { ...prev, data: update };
      });
    },
    onError: () => {
      errorToast('유저 삭제 요청이 실패했습니다. 다시 시도해 주세요.');
    },
  });

  return {
    deleteUserMutation,
  };
};
