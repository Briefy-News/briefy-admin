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
    setSelectedItem(pathname);
  }, [pathname]);

  const selectedStyle = { color: '#5569FF', backgroundColor: '#E9F2FC' };
  const defaultStyle = { color: '#6E6D73' };

  const onItemFocus = (_: SyntheticEvent<Element, Event> | null, itemId: string) => {
    let temp = itemId;
    if (itemId.startsWith('/tab')) {
      temp = itemId.split('-')[1];
    }
    setSelectedItem(temp);
    navigate(temp);
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
        <TreeItem className="focus-none" itemId="/user" label="User" sx={{ color: selectedItem === '/user' ? selectedStyle : defaultStyle }} />
        <TreeItem className="focus-none" itemId="/tab-/newsletter/create" label="Newsletter" sx={{ color: selectedItem.startsWith('/newsletter') ? selectedStyle : defaultStyle }}>
          <TreeItem className="focus-none" itemId="/newsletter/create" label="Newsletter 등록" sx={{ color: selectedItem === '/newsletter/create' ? selectedStyle : defaultStyle }} />
          {/* <TreeItem className="focus-none" itemId="/newsletters" label="Newsletter 모음" sx={{ color: selectedItem === '/newsletter/delete' ? selectedStyle : defaultStyle }} /> */}
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}

export default Aside;
