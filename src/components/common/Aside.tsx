import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from 'src/assets/icons/Logo';

function Aside() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const paths = pathname.split('/');
    setSelectedItem(paths[1]);
  }, [pathname]);

  const clickMenu = (path: string) => {
    setSelectedItem(path);
    navigate(`/${path}`);
  };
  const selectedStyle = { color: '#5569FF', backgroundColor: '#fafdff' };
  const defaultStyle = { color: '#6E6D73' };

  return (
    <Box sx={{ maxWidth: 400, minHeight: '100vh', minWidth: 250, backgroundColor: '#fff', borderRight: '1px solid #F3F3F8' }}>
      <div onClick={() => navigate('/user')} className="flex gap-[.6rem] cursor-pointer w-full justify-center my-9 items-end">
        <Logo />
        <p className="font-semibold text-primary">
          ADMIN
        </p>
      </div>
      <SimpleTreeView>
        <TreeItem onClick={() => clickMenu('user')} itemId="user" label="User" sx={{ color: selectedItem === 'user' ? selectedStyle : defaultStyle }} />
        <TreeItem onClick={() => clickMenu('newsletter')} itemId="newsletter" label="Newsletter" sx={{ color: selectedItem === 'newsletter' ? selectedStyle : defaultStyle }} />
      </SimpleTreeView>
    </Box>
  );
}

export default Aside;
