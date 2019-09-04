

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


let credentials = {
    apiKey: "AIzaSyD50CvuhC1IJVFhscE-UQXKeKzsFtB08n8",
    authDomain: "tic-tac-farm.firebaseapp.com",
    databaseURL: "https://tic-tac-farm.firebaseio.com",
    projectId: "tic-tac-farm",
    storageBucket: "tic-tac-farm.appspot.com",
    messagingSenderId: "685472119585",
    appId: "1:685472119585:web:8aa7b23d29f95127"
}

export default app.initializeApp(credentials)