import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SyntheticEvent, useEffect, useState } from 'react';
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

  const selectedStyle = { color: '#5569FF', backgroundColor: '#E9F2FC' };
  const defaultStyle = { color: '#6E6D73' };

  const onItemFocus = (_: SyntheticEvent<Element, Event> | null, itemId: string) => {
    setSelectedItem(itemId);
    navigate(`/${itemId}`);
  };

  return (
    <Box role="complementary" aria-label="Admin Dashboard Sidebar" sx={{ maxWidth: 400, minHeight: '100vh', minWidth: 250, backgroundColor: '#fff', borderRight: '1px solid #F3F3F8' }}>
      <div onClick={() => navigate('/user')} className="flex gap-[.6rem] cursor-pointer w-full justify-center my-9 items-end">
        <Logo />
        <p className="font-semibold text-primary">
          ADMIN
        </p>
      </div>
      <SimpleTreeView onItemFocus={onItemFocus}>
        <TreeItem className="focus-none" itemId="user" label="User" sx={{ color: selectedItem === 'user' ? selectedStyle : defaultStyle }} />
        <TreeItem className="focus-none" itemId="newsletter" label="Newsletter" sx={{ color: selectedItem === 'newsletter' ? selectedStyle : defaultStyle }} />
      </SimpleTreeView>
    </Box>
  );
}

export default Aside;
