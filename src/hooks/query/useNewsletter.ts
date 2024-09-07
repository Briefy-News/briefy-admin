import { useMutation } from '@tanstack/react-query';
import { insertOne } from 'src/api/newsletter';
import { Newsletter } from 'src/types/newsletter';
import useToast from 'src/hooks/useToast';

export const useInsertNewsletter = () => {
  const { successToast, errorToast } = useToast();

  const insertNewsletterMutation = useMutation({
    mutationFn: (body: Newsletter) => insertOne(body),
    onSuccess: (res) => {
      successToast(`${res.title} 뉴스레터를 등록했습니다.`);
    },
    onError: () => {
      errorToast('뉴스레터 등록에 실패했습니다.');
    },
  });

  return {
    insertNewsletterMutation,
  };
};
