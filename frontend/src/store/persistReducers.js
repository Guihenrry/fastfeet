import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default function(reducers) {
  return persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
}
