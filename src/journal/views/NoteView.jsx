import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks';
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, formState, handleInputChange } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: 'Nota actualizada',
        text: `${messageSaved}`,
        icon: 'success',
      });
    }
  }, [messageSaved]);

  const handleClickSave = () => {
    dispatch(startSaveNote());
  };

  const handleFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const handleClickDelete = () => {
    dispatch(startDeletingNote());
    Swal.fire({
      title: 'Nota eliminada',
      icon: 'warning',
    });
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
        <input
          type='file'
          multiple
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          disabled={isSaving}
          color='primary'
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
          <Typography component='span' fontSize='0.875rem' fontWeight='500'>
            SUBIR
          </Typography>
        </IconButton>
        <Button
          disabled={isSaving}
          color='primary'
          sx={{ padding: 2 }}
          onClick={handleClickSave}
        >
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
      <Grid container justifyContent='end'>
        <Button onClick={handleClickDelete} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      {/* Image Gallery */}
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
