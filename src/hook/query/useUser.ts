import { useMutation, useQuery } from '@tanstack/react-query';
import { changeRole, ChangeRole, getAll, GetAll } from 'src/api/user';
import useToast from 'src/hook/useToast';
import { roleName, Roles } from 'src/types/user';

export const useGetUsers = ({ page, take = 20 } : GetAll) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users', page, take],
    queryFn: () => getAll({ page, take }),
  });

  return { data, isError, isLoading };
};

export const useChangeRole = () => {
  const { successToast, errorToast } = useToast();

  const changeRoleMutation = useMutation({
    mutationFn: ({ id, role }: ChangeRole) => changeRole({ id, role }),
    onSuccess: (res) => {
      successToast(`${roleName[res.role as Roles]}로 변경되었습니다.`);
    },
    onError: (error) => {
      errorToast('권한 변경에 실패했습니다.');
    },
  });

  return {
    changeRoleMutation,
  };
};
