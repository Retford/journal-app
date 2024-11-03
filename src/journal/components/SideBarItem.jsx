import { TurnedInNot } from '@mui/icons-material';
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({
  title,
  body,
  id,
  date,
  imageUrls = [],
  toggleDrawer,
}) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  const handleClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <Box onClick={toggleDrawer(false)}>
        <ListItemButton onClick={handleClickNote}>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container display='flex' direction='column'>
            <ListItemText primary={newTitle} />
            <ListItemText secondary={body} />
          </Grid>
        </ListItemButton>
      </Box>
    </ListItem>
  );
};
