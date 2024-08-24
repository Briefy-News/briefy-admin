import { Routes, Route } from 'react-router-dom';

import PrivateRoute from 'src/components/Layout/PrivateRoute';
import UserPage from 'src/pages/UserPage';
import NewsletterPage from 'src/pages/NewsletterPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
