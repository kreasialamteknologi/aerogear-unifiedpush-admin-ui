export const snippet = `
final PushSender sender =
    DefaultPushSender.withRootServerURL("__SERVERURL__")
        .pushApplicationId("__PUSHAPPLICATIONID__")
        .masterSecret("__MASTERSECRET__")
    .build();

final UnifiedMessage unifiedMessage = UnifiedMessage.
    withMessage()
        .alert("Hello from Java Sender API!")
    .build();

 
sender.send(unifiedMessage, () -> {
    //do cool stuff
}); 
`;
