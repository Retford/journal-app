import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import { fileUpload, loadNotes } from '../../../src/helpers';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNotes,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
import {
  startDeletingNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploadingFiles,
} from '../../../src/store/journal/thunks';

jest.mock('../../../src/helpers');

describe('pruebas en JournalThunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('startNewNote debe de crear una nueva nota en blanco', async () => {
    const uid = 'TEST-ID';
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );

    // Borrar de Firebase

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  }, 10000);

  test('startLoadingNotes debe de cargar las notas', async () => {
    const uid = 'TEST-ID';
    getState.mockReturnValue({ auth: { uid: uid } });

    await startLoadingNotes()(dispatch, getState);

    const notes = await loadNotes(uid);

    expect(dispatch).toHaveBeenCalledWith(setNotes(notes));
  });

  it('startSaveNote debe de guardar la nota', async () => {
    const uid = 'TEST-ID';
    const noteActive = {
      title: 'Update',
      body: 'Update',
      id: '123',
      date: 1730706033960,
      imageUrls: ['https://test3.jpg', 'https://test5.jpg'],
    };

    getState.mockReturnValue({
      auth: { uid: uid },
      journal: { active: noteActive },
    });

    await startSaveNote()(dispatch, getState);

    const noteToFirestore = { ...noteActive };

    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

    await setDoc(docRef, noteToFirestore, { merge: true });

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(updateNote(noteActive));
  });

  it('startUploadingFiles debe de actualizar los campos de las notas', async () => {
    const files = ['https://test.png', 'https://test1.png'];
    const mockFileUrl = 'https://some-url.com/photo.jpg';
    fileUpload.mockResolvedValue(mockFileUrl);

    await startUploadingFiles(files)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(
      setPhotosToActiveNotes([mockFileUrl, mockFileUrl])
    );
  });

  it('startDeletingNote debe de eliminar una nota con el id', async () => {
    const uid = 'TEST-ID';
    const noteActive = {
      title: 'Update',
      body: 'Update',
      id: '123',
      date: 1730706033960,
      imageUrls: ['https://test.jpg', 'https://test2.jpg'],
    };
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: { active: noteActive },
    });

    await startDeletingNote()(dispatch, getState);

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

    await deleteDoc(docRef);

    expect(dispatch).toHaveBeenCalledWith(deleteNoteById(noteActive.id));
  });
});
