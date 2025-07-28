import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {
  GoogleSignin as _GoogleSignin,
  statusCodes as _statusCodes,
} from '@react-native-google-signin/google-signin';

// Firestore
export const db = firestore();
export const serverTimestamp = firestore.FieldValue.serverTimestamp;

// Auth
export const firebaseAuth = auth();
export const GoogleAuthProvider = auth.GoogleAuthProvider;

// Storage
export const firebaseStorage = storage();

// Google Sign-In
export const GoogleSignin = _GoogleSignin;
export const statusCodes = _statusCodes;
