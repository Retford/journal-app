import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { setActiveNote, startSaveNote } from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.journal);
  const { body, title, date, formState, handleInputChange } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const handleClickSave = () => {
    dispatch(startSaveNote());
  };

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button color='primary' sx={{ padding: 2 }} onClick={handleClickSave}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          name='title'
          value={title}
          onChange={handleInputChange}
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que sucedió en el día de hoy'
          name='body'
          value={body}
          onChange={handleInputChange}
          minRows={5}
        />
      </Grid>
      {/* Image Gallery */}
      <ImageGallery />
    </Grid>
  );
};
