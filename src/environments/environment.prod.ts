import * as algoliasearch from 'algoliasearch/lite';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDt5Bwx83wcBthYjlY5eTBiuElPx3958d0',
    authDomain: 'job-app-613fe-prod.firebaseapp.com',
    databaseURL: 'https://job-app-613fe-prod.firebaseio.com',
    projectId: 'job-app-613fe-prod',
    storageBucket: 'job-app-613fe-prod.appspot.com',
    messagingSenderId: '670825630495',
    appId: '1:670825630495:web:11a67b84e06abedd03fe2a',
    measurementId: 'G-T1PB86PNS9'
  }
};

export const searchClient = algoliasearch(
  '2PFBCN8AMZ',
  '1275bd37c7cbaf26253944ad8a9ca6e4'
);
