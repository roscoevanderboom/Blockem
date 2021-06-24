import firebase from ".";
// Firebase references
let db = firebase.firestore();
// Collections
export let gameRooms = db.collection("gamerooms");
export let userProfiles = db.collection("userProfiles");
export let usernames = db.collection("usernames");
export let leaderboard = db.collection("leaderboard");
