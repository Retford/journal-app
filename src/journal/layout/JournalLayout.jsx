import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';
import { useState } from 'react';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <NavBar openDrawer={openDrawer} toggleDrawer={toggleDrawer} />

      <SideBar
        drawerWidth={drawerWidth}
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
      />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
