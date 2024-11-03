import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

// eslint-disable-next-line react/prop-types
export const SideBar = ({ drawerWidth = 280, openDrawer, toggleDrawer }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} toggleDrawer={toggleDrawer} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
