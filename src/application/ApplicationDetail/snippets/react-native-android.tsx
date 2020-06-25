export const snippet = `
import RNUnifiedPush from '@aerogear/aerogear-reactnative-push';

const ups = new RNUnifiedPush();

ups.init(
{ pushServerURL: "__SERVERURL__",
  android: {
    senderID: "__SENDERID__",
    variantID: "__VARIANTID__",
    variantSecret: "__VARIANT_SECRET__"
  }
}).catch(err => console.log("Error Initializing", err));

ups.register({
      "alias":"rnAlias",
      "categories":["cat1", "cat2"]
}).then(()=>{
  //You are registered, inform your app
})

ups.registerMessageHandler(message => console.log('Received message from UPS', message.alert))
`;
