import { supabase } from 'src/utils/supabase';

interface GetImgUrl {
  path: string;
  title: string;
  img: File;
}

export const getImgUrl = async ({ path, title, img }: GetImgUrl) => {
  const formData = new FormData();
  formData.append(`${path}`, img);

  const { data, error } = await supabase
    .storage
    .from(`${path}`)
    .upload(`${title}`, formData, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) {
    alert(error.message);
  }

  return {
    url: data?.fullPath,
  };
};

export default getImgUrl;
