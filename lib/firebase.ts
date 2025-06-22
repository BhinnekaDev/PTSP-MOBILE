import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const db = firestore();
export const firebaseAuth = auth();
export const GoogleAuthProvider = auth.GoogleAuthProvider;
export const serverTimestamp = firestore.FieldValue.serverTimestamp;
