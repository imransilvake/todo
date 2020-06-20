// app
import firebase from 'firebase/app';
import 'firebase/firestore';

// firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDPUVmSGYKY_Mn3hi5p5HQDyH5__TDMu8Y',
	authDomain: 'todo-c9f93.firebaseapp.com',
	databaseURL: 'https://todo-c9f93.firebaseio.com',
	projectId: 'todo-c9f93',
	storageBucket: 'todo-c9f93.appspot.com',
	messagingSenderId: '463349304908',
	appId: '1:463349304908:web:856561cceef32fe6562ee9'
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// export
export default firebase;
