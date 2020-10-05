importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js')
const firebaseConfig = {
  messagingSenderId: '473604157893',
}
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i]
        windowClient.postMessage(payload)
      }
    })
    .then(() => {
      return registration.showNotification('Push notification')
    })
  return promiseChain
})
self.addEventListener('notificationclick', function (event) {
  console.log(event)
})
