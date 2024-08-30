import { useEffect, useState } from 'react';
import { useWindowSize } from '@reactuses/core';
import toast, { ToastPosition } from 'react-hot-toast';
import CheckCircleIcon from 'src/assets/icons/CheckCircleIcon';
import ErrorCircleIcon from 'src/assets/icons/ErrorCircleIcon';

const useToast = () => {
  const { width } = useWindowSize();
  const [position, setPosition] = useState<ToastPosition | undefined>('top-left');

  useEffect(() => {
    if (width < 768) {
      setPosition('top-center');
    }
    if (width > 767) {
      setPosition('top-left');
    }
  }, [width]);

  const successToast = (message: string) => {
    toast(message, { position, icon: <CheckCircleIcon /> });
  };
  const errorToast = (message: string) => {
    toast(message, { position, icon: <ErrorCircleIcon /> });
  };

  return {
    successToast,
    errorToast,
  };
};

export default useToast;
