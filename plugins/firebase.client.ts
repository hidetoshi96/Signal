import { initializeApp } from 'firebase/app';
// import { getMessaging, onMessage } from 'firebase/messaging';
// import { getStorage, ref, getMetadata, getBlob } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDLuQUzqDAvWi75rMkYaR8XGWGUW3SS94E',
    authDomain: 'noble-vine-369311.firebaseapp.com',
    databaseURL:
      'https://noble-vine-369311-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'noble-vine-369311',
    storageBucket: 'noble-vine-369311.appspot.com',
    messagingSenderId: '94687119429',
    appId: '1:94687119429:web:6d2080a1d3f92853f77b2c',
    measurementId: 'G-7KK9WN5V0T',
  };
  const app = initializeApp(firebaseConfig);
  getAuth(app);
  // const messaging = getMessaging();
  // onMessage(messaging, (payload) => {
  //   console.log('Message received. ', payload);
  // });

  // const storage = getStorage();
  // getMetadata(ref(storage, 'hinansaki.json'))
  // 	.then((metadata) => {
  // 		const getEvacuationSite = localStorage.getItem('evacuationSite')
  // 		if(getEvacuationSite==null || new Date(metadata.updated) > new Date(JSON.parse(getEvacuationSite).updated)){
  // 			console.log("update");
  // 			getBlob(ref(storage, 'hinansaki.json'))
  // 				.then(async blob => {
  // 					const setData = {
  // 						updated: Date.now(),
  // 						data: JSON.parse(await blob.text())
  // 					}
  // 					localStorage.setItem('evacuationSite', JSON.stringify(setData))
  // 				})
  // 		}else{
  // 			console.log("skip update")
  // 		}
  // 	})
  // 	.catch((error) => {
  // 		// Uh-oh, an error occurred!
  // 		console.log(error)
  // 	});
});
