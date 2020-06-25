export const snippet = `
import { PushRegistration } from '@aerogear/push';

var app = {
  // Application Constructor
  initialize: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    this.registerToUPS();

    PushRegistration.onMessageReceived((notification => {
      console.log('Received push notification: ', notification.message);
    }));
  },

  registerToUPS: () => {
    new PushRegistration({
      url: '__SERVERURL__',
      android: { 
        senderID: '__SENDERID__', 
        variantID: '__VARIANTID__', 
        variantSecret: '__VARIANT_SECRET__' 
      }
    })
    .register()
    .then(() => {
      console.log('Registered!');
    })
    .catch(error => {
      console.log('Failed: ', error.message, JSON.stringify(error))
    });
  }
};

app.initialize();
`;
