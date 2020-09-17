export const snippet = `
const agSender = require('unifiedpush-node-sender');

const settings = {
  url: "__SERVERURL__",
  applicationId: "__PUSHAPPLICATIONID__",
  masterSecret: "__MASTERSECRET__"
};

const message = {
  alert: "Hello from the Node.js Sender API!"
};

const options = {
  config: {
    ttl: 3600
  }
};

agSender(settings).then((client) => {
  client.sender.send(message, options).then((response) => {
    console.log('success', response);
  }).catch((error) => {
    console.log('error', error);
  })
});
`;
