const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise');
admin.initializeApp();

exports.scheduledFunction = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(() => {
    const options = {
      url: 'https://api.p2pquake.net/v2/history?codes=556',
      method: 'GET',
      json: true,
    };
    return request(options).then(async (body) => {
      const loadedEarthquakes = await getLoadedEarthquakes();
      for (const element of body) {
        if (!loadedEarthquakes.includes(element.id)) {
          loadedEarthquakes.push(element.id);
          setLoadedEarthquakes(loadedEarthquakes);
          for (const area of element.areas) {
            if (area.pref === '和歌山' && area.scaleFrom >= 40) {
              return sendMessage();
            }
          }
        }
      }
      return 'non earthquake';
    });
  });

exports.earthquakeTest = functions.https.onCall(() => {
  return sendMessage();
});

exports.getAllTokens = functions.https.onCall(() => {
  return getAllTokens();
});

exports.getJson = functions.https.onCall(() => {
  const options = {
    url: 'https://api.p2pquake.net/v2/history?codes=556',
    method: 'GET',
    json: true,
  };
  return request(options).then(async (body) => {
    const loadedEarthquakes = await getLoadedEarthquakes();
    for (const element of body) {
      if (!loadedEarthquakes.includes(element.id)) {
        loadedEarthquakes.push(element.id);
        setLoadedEarthquakes(loadedEarthquakes);
        for (const area of element.areas) {
          if (area.pref === '和歌山' && area.scaleFrom >= 40) {
            return sendMessage();
          }
        }
      }
    }
    return 'non earthquake';
  });
});

/**
 * 通知配信
 * @return {any} 通知
 */
async function sendMessage() {
  const message = {
    notification: {
      title: '和歌山で地震検知',
      body: 'アプリを起動してください',
    },
    webpush: {
      fcmOptions: {
        link: '/',
      },
    },
    tokens: await getAllTokens(),
  };
  return admin
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

/**
 * 全ユーザーのFCMトークンを取得
 * @return {string[]} FCMトークン
 */
function getAllTokens() {
  return admin
    .database()
    .ref('/FCMTokens')
    .get()
    .then((snapshot) => {
      const FCMTokens = snapshot.val();
      const registrationTokens = Object.values(FCMTokens).map(
        (user) => user.FCMToken
      );
      return registrationTokens;
    });
}

function setLoadedEarthquakes(earthquakes) {
  return admin.database().ref('/loadedEarthquakes').set(earthquakes);
}

function getLoadedEarthquakes() {
  return admin
    .database()
    .ref('/loadedEarthquakes')
    .get()
    .then((snapshot) => {
      if (snapshot.val() == null) {
        return [];
      }
      return Object.values(snapshot.val());
    });
}
