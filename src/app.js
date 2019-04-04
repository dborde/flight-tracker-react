import moment from 'moment';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

let useStorage = true;
const lastLoginDate = localStorage.getItem('loginDate');
const compare = moment(lastLoginDate).add(8, 'hours').valueOf();
const now = moment().valueOf();
if (compare < now) {
  useStorage = false;
}
const store = configureStore(useStorage);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
