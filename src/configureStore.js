import { createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  let store = createStore(rootReducer, composeWithDevTools());
  return store;
}
