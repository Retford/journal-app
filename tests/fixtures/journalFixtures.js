export const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};

export const initialStateWithActive = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: {
    title: 'Update',
    body: 'Update',
    id: '123',
    date: 1730706033960,
    imageUrls: ['https://test.jpg', 'https://test2.jpg'],
  },
};

export const stateFull = {
  isSaving: false,
  messageSaved: '',
  notes: [
    {
      id: '511I4u0zl8YFvlbHnX5S',
      date: 1730706033960,
      imageUrls: [
        'https://res.cloudinary.com/dgze8y0m9/image/upload/v1730706377/wmrbk5fiourosarxvmti.webp',
      ],
      body: 'first',
      title: 'First',
    },
    {
      id: 'RePelLrmeNPlxoDLmu9p',
      imageUrls: [],
      date: 1730739606305,
      body: 'Se',
      title: 'Second',
    },
    {
      title: 'abc',
      body: 'abc',
      imageUrls: [],
      date: 1730798913974,
      id: 'd6h0ywZsNQDagpCqy3Bf',
    },
  ],
  active: {
    title: 'First',
    body: 'first',
    id: '511I4u0zl8YFvlbHnX5S',
    date: 1730706033960,
    imageUrls: [
      'https://res.cloudinary.com/dgze8y0m9/image/upload/v1730706377/wmrbk5fiourosarxvmti.webp',
    ],
  },
};
