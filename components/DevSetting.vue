<template>
  <div class="toast toast-center toast-middle space-y-8">
    <button class="btn btn-lg" @click="getJsonClick">getJson</button>
    <button class="btn btn-lg" @click="earthquakeTestClick">
      Earthquake Test
    </button>
    <button class="btn btn-lg" @click="getLoginUserFCMTokenClick">
      getLoginUserFCMToken
    </button>
    <button class="btn btn-lg" @click="getFCMTokensClick">getFCMTokens</button>
  </div>
</template>
<script setup>
  import { getFunctions, httpsCallable } from 'firebase/functions';
  import { getMessaging, getToken } from 'firebase/messaging';
  const functions = getFunctions();
  const getJsonClick = () => {
    const getJson = httpsCallable(functions, 'getJson');
    getJson()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const earthquakeTestClick = () => {
    const earthquakeTest = httpsCallable(functions, 'earthquakeTest');
    earthquakeTest()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getFCMTokensClick = () => {
    const getAllTokens = httpsCallable(functions, 'getAllTokens');
    getAllTokens()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getLoginUserFCMTokenClick = () => {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
      console.log(permission);
    });

    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        'BFlg7MDQYzVF1lM8mwLi7amKHiAAxWCFbFx_D4SkGu1mUb0J3UsRWkAwKwWZurBLzC1Q6oN0g2cX8UkMxvYDuPQ',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  };
</script>
