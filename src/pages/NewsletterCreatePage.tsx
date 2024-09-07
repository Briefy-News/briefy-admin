import { Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Category, categoryName } from 'src/types/category';
import { DayOfWeek, dayOfWeekName } from 'src/types/dayofweek';
import { Newsletter } from 'src/types/newsletter';
import getImgUrl from 'src/utils/getImgUrl';
import { useInsertNewsletter } from 'src/hooks/query';

function NewsletterCreatePage() {
  const [form, setForm] = useState<Newsletter>({
    title: '',
    category: Category.BUSINESS,
    description: '',
    link: '',
    thumbnail: '',
    uploadDays: [],
  });
  const [tempImg, setTempImg] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const { insertNewsletterMutation } = useInsertNewsletter();

  const addNewsletter = async (e: FormEvent) => {
    const { thumbnail, ...formToCheck } = form;
    const isValid = Object.values(formToCheck).every((value) => value.length > 0);
    e.preventDefault();
    if (!isValid || !tempImg) {
      alert('비어있는 내용이 없는지 확인해 주세요.');
      return;
    }
    const { url } = await getImgUrl({ path: 'newsletter', title: form.title, img: tempImg });
    if (!url) return;
    setForm((prev) => ({ ...prev, thumbnail: url }));
    insertNewsletterMutation.mutate(form);
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<Category>) => {
    const { value, name } = e.target;
    if (name === 'uploadDays') {
      const dayValue = value as DayOfWeek;
      const isExisting = form.uploadDays.includes(dayValue);
      setForm((prev) => ({ ...prev, [name]: isExisting ? prev.uploadDays.filter((day) => day !== dayValue) : [...prev.uploadDays, dayValue] }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const changeTempImg = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setTempImg(files[0]);
    }
  };

  return (
    <div className="px-5 py-10 w-full">
      <h1 className="text-black900 text-3xl font-medium">
        Newsletter
      </h1>
      <p className="text-black900 font-light pt-5 pb-3">뉴스레터 등록하기</p>
      <form onSubmit={addNewsletter} className="flex flex-col w-full gap-5">
        <div className="block lg:flex gap-5">
          <div className="input-label">
            thumbnail
            <div onClick={() => fileRef.current?.click()} className="cursor-pointer h-[356px] w-[356px] rounded-[20px] border-[1px] border-black300 overflow-hidden">
              {tempImg && <img src={URL.createObjectURL(tempImg)} alt="thumbnail" className="w-full object-cover object-center hover:scale-105 duration-300 transition-all ease-in-out" />}
              {!tempImg && (
                <div className="w-full h-full hover:scale-105 duration-300 transition-all ease-in-out bg-[#cdced2] flex justify-center items-center text-white font-semibold text-2xl">
                  이미지 선택하기
                </div>
              )}
            </div>
            <input aria-hidden="true" className="hidden" ref={fileRef} onChange={changeTempImg} name="thumbnail" type="file" accept="image/jpeg, image/png, image/jpg" />
          </div>
          <div className="flex flex-col w-full gap-3 mt-7">
            <label className="input-label">
              <span>title</span>
              <input onChange={changeForm} className="input-default" type="text" name="title" />
            </label>
            <label className="input-label">
              category
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.category}
                label="Category"
                onChange={changeForm}
                name="category"
              >
                {Object.values(Category).map((category) => (
                  <MenuItem key={category} value={category}>
                    {categoryName[category]}
                  </MenuItem>
                ))}
              </Select>
            </label>
            <label className="input-label">
              description
              <input onChange={changeForm} className="input-default" type="text" name="description" />
            </label>
            <label className="input-label">
              link
              <input onChange={changeForm} className="input-default" type="text" name="link" />
            </label>
          </div>
        </div>
        <div>
          <div className="input-label text-black900">
            upload days
            <div>
              {Object.values(DayOfWeek).map((day, idx) => (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox value={day} checked={form.uploadDays.includes(day)} onChange={changeForm} name="uploadDays" />
                  }
                  label={dayOfWeekName[day]}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="btn-default blue-btn mt-3">등록하기</button>
        </div>
      </form>
    </div>
  );
}

export default NewsletterCreatePage;
