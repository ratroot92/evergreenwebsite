// old code start
// importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');
// firebase.initializeApp({
//     apiKey: "AIzaSyDzy2t2rl6mNhVfQBWbmJHXnahzjk2GTe8",
//     authDomain: "webpush-800ad.firebaseapp.com",
//     projectId: "webpush-800ad",
//     storageBucket: "webpush-800ad.appspot.com",
//     messagingSenderId: "252480806005",
//     appId: "1:252480806005:web:f322fb4b6eed8736c66c3c",
//     measurementId: "G-88MLN2EMKX"
// });
// const messaging = firebase.messaging();
// old code end

// new code start

importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');





 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object

 initializeFirebase();

function initializeFirebase() {
 // import { getMessaging, onMessage } from "firebase/messaging";
 var firebaseConfig = {
  apiKey: "AIzaSyAgGq4gbKYtTKWcjXtxq0uzkM-v3bbSkMg",
  authDomain: "savvy-temple-313715.firebaseapp.com",
  projectId: "savvy-temple-313715",
  storageBucket: "savvy-temple-313715.appspot.com",
  messagingSenderId: "974835948385",
  appId: "1:974835948385:web:dc742d5c5abf66671e8320"
  };
  // Initialize Firebase
  var firebaseApp = firebase.initializeApp(firebaseConfig);
  var messaging = firebase.messaging();


  // messaging.setBackgroundMessageHandler(function(payload) {
  //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
  //   // ...
  // });
  
  // handle background message start
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //   body: 'Background Message body.',
    //   icon: '/firebase-logo.png',
    //   data:payload.data
    // };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);

      

//     const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true
//     })
//     .then(windowClients => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//         const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png',
//       data:payload.data
//     };
//       return registration.showNotification("notification title",notificationOptions);
//     });
//   return promiseChain;

  //  window.open("http://localhost:4200/#/login")
    //window.location.href = 
   // localStorage.setItem('backgroundData=', payload.data);
    // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //   body: 'Background Message body.',
    //   icon: '/firebase-logo.png',
    //   data:payload.data
    // };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });

  // handle background message end

// handle foreground message start
// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });
// messaging.onMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received foreground message ', payload);

//   // Customize notification here
//   const notificationTitle = 'Foreground Message Title';
//   const notificationOptions = {
//     body: 'Foreground Message body.',
//   //  icon: '/firebase-logo.png',
//     data:payload.data
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);

    

// //     const promiseChain = clients
// //     .matchAll({
// //       type: "window",
// //       includeUncontrolled: true
// //     })
// //     .then(windowClients => {
// //       for (let i = 0; i < windowClients.length; i++) {
// //         const windowClient = windowClients[i];
// //         windowClient.postMessage(payload);
// //       }
// //     })
// //     .then(() => {
// //         const notificationOptions = {
// //       body: 'Background Message body.',
// //       icon: '/firebase-logo.png',
// //       data:payload.data
// //     };
// //       return registration.showNotification("notification title",notificationOptions);
// //     });
// //   return promiseChain;

// //  window.open("http://localhost:4200/#/login")
//   //window.location.href = 
//  // localStorage.setItem('backgroundData=', payload.data);
//   // Customize notification here
//   // const notificationTitle = 'Background Message Title';
//   // const notificationOptions = {
//   //   body: 'Background Message body.',
//   //   icon: '/firebase-logo.png',
//   //   data:payload.data
//   // };

//   // self.registration.showNotification(notificationTitle,
//   //   notificationOptions);
// });

// handle foreground message end

  // self.addEventListener('notificationclick', function(event) {
  //     console.log("click event=",event)
     
  //   // do what you want
  //   // ...
  // });  
}
// new code end

// import { initializeApp } from "firebase/app";
// import { getMessaging,onMessage } from "firebase/messaging";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: 'AIzaSyDzy2t2rl6mNhVfQBWbmJHXnahzjk2GTe8',
//   authDomain: 'webpush-800ad.firebaseapp.com',
//  // databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'webpush-800ad',
//   storageBucket: 'webpush-800ad.appspot.com',
//   messagingSenderId: '252480806005',
//   appId: '1:252480806005:web:f322fb4b6eed8736c66c3c',
//   measurementId: 'G-88MLN2EMKX',
// });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
//const messaging = getMessaging(firebaseApp);

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
//import { getMessaging, onMessage } from "firebase/messaging";

//const messaging = getMessaging();
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });

// onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });





