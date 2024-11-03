import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';

export const NavBar = ({ openDrawer, toggleDrawer }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          onClick={toggleDrawer(true)}
          color='inherit'
          edge='start'
          sx={{ mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='center'
        >
          <Typography variant='h6' noWrap component='div'>
            JournalApp
          </Typography>
          <IconButton color='error' onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
