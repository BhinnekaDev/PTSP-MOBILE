import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin as _GoogleSignin,
  statusCodes as _statusCodes,
} from '@react-native-google-signin/google-signin';

// Firebase
export const db = firestore();
export const firebaseAuth = auth();
export const GoogleAuthProvider = auth.GoogleAuthProvider;
export const serverTimestamp = firestore.FieldValue.serverTimestamp;

// Google Sign-In
export const GoogleSignin = _GoogleSignin;
export const statusCodes = _statusCodes;
