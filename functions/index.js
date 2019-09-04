const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getWaitingList = functions.https.onRequest((request, response) => {
 const promise = admin.firestore().doc('WailtingList').get()
 promise.then(snapshot => {
   const data = snapshot.data()   
   response.send(data);
   return data;
 })
 .catch((err)=> {
   console.log(err)
 })
});
