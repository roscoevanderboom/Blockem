import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { credentials } from "./api";

export const FieldValue = app.firestore.FieldValue;
export const firebase = app;
export default app.initializeApp(credentials);
