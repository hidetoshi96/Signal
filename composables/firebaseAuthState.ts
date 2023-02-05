import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getToken, getMessaging } from 'firebase/messaging';
import { getDatabase, ref, set, update, get, child } from 'firebase/database';

export const useFirebaseUser = () => useState('firebaseUser', () => {});

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const auth = getAuth();
  const messaging = getMessaging();
  const userInfo = useUserInfo();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).then(async (userCredential) => {
    userInfo.value = {
      id: userCredential.user.uid,
      name,
      message: '',
      urgency: '0',
    };
    const db = getDatabase();
    set(ref(db, `users/${userCredential.user.uid}`), {
      name,
      message: '',
      urgency: '0',
    });
    const fcmToken = await getToken(messaging, {
      vapidKey:
        'BFlg7MDQYzVF1lM8mwLi7amKHiAAxWCFbFx_D4SkGu1mUb0J3UsRWkAwKwWZurBLzC1Q6oN0g2cX8UkMxvYDuPQ',
    });
    set(ref(db, `FCMTokens/${userCredential.user.uid}`), {
      FCMToken: fcmToken,
    });
    await navigateTo('/');
  });
  return credentials;
};

export const signInUser = async (email: string, password: string) => {
  const userInfo = useUserInfo();
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).then(async (userCredential) => {
    const db = getDatabase();
    await get(child(ref(db), `users/${userCredential.user.uid}`)).then(
      (snapshot) => {
        userInfo.value = {
          id: userCredential.user.uid,
          name: snapshot.val().name,
          message: snapshot.val().message,
          urgency: snapshot.val().urgency,
        };
      }
    );
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        'BFlg7MDQYzVF1lM8mwLi7amKHiAAxWCFbFx_D4SkGu1mUb0J3UsRWkAwKwWZurBLzC1Q6oN0g2cX8UkMxvYDuPQ',
    }).then((currentToken) => {
      const updates: { [key: string]: string } = {};
      updates[`FCMTokens/${userCredential.user.uid}/FCMToken`] = currentToken;
      update(ref(db), updates);
    });
    await navigateTo('/');
  });
  return credentials;
};

export const signOutUser = async () => {
  const auth = getAuth();
  await auth.signOut();
  const userInfo = useUserInfo();
  userInfo.value = null;
  await navigateTo('/login');
};
