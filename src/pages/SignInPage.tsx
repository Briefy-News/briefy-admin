import { NavLink } from 'react-router-dom';
import ContinueGoogleIcon from 'src/assets/icons/ContinueGoogleIcon';
import GoogleIcon from 'src/assets/icons/GoogleIcon';
import Logo from 'src/assets/icons/Logo';
import FadeIn from 'src/components/Layout/FadeIn';

function SignInPage() {
  return (
    <FadeIn>
      <div className="pt-[150px] pb-8 flex justify-center w-full items-center flex-col">
        <div className="flex flex-col">
          <div className="flex gap-[.6rem] cursor-pointer w-full justify-center mb-[2.8rem] items-end">
            <Logo />
            <p className="font-semibold text-primary">
              ADMIN
            </p>
          </div>
          <NavLink
            to={`${import.meta.env.VITE_BASE_URL}/google/redirect`}
            className="flex gap-3 justify-center items-center w-full border-2
              h-[40px] sm:h-[48px] rounded-[6px] sm:rounded-[10px] px-[40px] sm:px-[60px]"
          >
            <GoogleIcon />
            <ContinueGoogleIcon />
          </NavLink>
        </div>
        <p className="mt-[8px] text-[0.75rem] sm:text-[0.875rem] text-black500 font-[300] text-center">
          구글 계정으로 로그인해 주세요.
        </p>
      </div>
    </FadeIn>
  );
}

export default SignInPage;
