import { Routes, Route } from 'react-router-dom';

import PrivateRoute from 'src/components/Layout/PrivateRoute';
import UserPage from 'src/pages/UserPage';
import SignInPage from 'src/pages/SignInPage';
import NewsletterCreatePage from 'src/pages/NewsletterCreatePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/newsletter/create" element={<NewsletterCreatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
