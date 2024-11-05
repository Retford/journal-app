import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
import {
  initialState,
  initialStateWithActive,
  stateFull,
} from '../../fixtures/journalFixtures';

describe('pruebas en JournalSlice', () => {
  const newNote = {
    title: '',
    body: '',
    imageUrls: [],
    date: new Date().getTime(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('el nombre es el journal', () => {
    const state = journalSlice.reducer(initialState, {});

    expect(journalSlice.name).toBe('journal');
    expect(state).toEqual(initialState);
  });

  test('savingNewNote debe de guardar una nueva nota', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state.isSaving).toBe(true);
  });

  test('addNewEmptyNote debe de agregar una nueva nota', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));

    expect(state.notes[0]).toEqual(newNote);
  });

  test('setActiveNote debe de mostrar la nota activa', () => {
    const state = journalSlice.reducer(initialState, setActiveNote(newNote));
    expect(state.active).toEqual(newNote);
  });

  test('setNotes debe de mostrar las notas de un usuario específico', () => {
    const state = journalSlice.reducer(initialState, setNotes(newNote));
    expect(state.notes).toEqual(newNote);
  });

  test('setSaving debe de guardar los cambios de la nota', () => {
    const state = journalSlice.reducer(initialState, setSaving());

    expect(state.isSaving).toBe(true);
  });

  test('updateNote debe de actualizar los campos de la nota activa', () => {
    const noteActive = {
      title: 'Update2',
      body: 'Update2',
      id: '511I4u0zl8YFvlbHnX5S',
      date: 1730706033960,
      imageUrls: ['https://test.png'],
    };

    const state = journalSlice.reducer(stateFull, updateNote(noteActive));

    expect(state.messageSaved).toBe(
      `${noteActive.title}, actualizada correctamente`
    );

    expect(state.notes).toContain(noteActive);
  });

  test('setPhotosToActiveNotes debe de obtener todas las imágenes', () => {
    const imagesUrls = [
      'https://test1.png',
      'https://test2.png',
      'https://test3.png',
    ];

    const state = journalSlice.reducer(
      initialStateWithActive,
      setPhotosToActiveNotes(imagesUrls)
    );
    expect(state.active.imageUrls).toEqual([
      'https://test.jpg',
      'https://test2.jpg',
      'https://test1.png',
      'https://test2.png',
      'https://test3.png',
    ]);
  });

  test('clearNotesLogout debe de limpiar el estado al hacer logout', () => {
    const state = journalSlice.reducer(stateFull, clearNotesLogout());
    expect(state).toEqual(initialState);
  });

  test('deleteNoteById debe de eliminar una nota por el ID', () => {
    const state = journalSlice.reducer(
      stateFull,
      deleteNoteById('511I4u0zl8YFvlbHnX5S')
    );
    expect(state.notes.length).toBe(2);
  });
});
