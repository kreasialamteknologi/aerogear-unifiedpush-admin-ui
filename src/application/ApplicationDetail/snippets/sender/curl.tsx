export const snippet = `
curl -u "__PUSHAPPLICATIONID__:__MASTERSECRET__"  \\
   -v -H "Accept: application/json" -H "Content-type: application/json"  \\
   -X POST  -d \\
  '{
     "message": {
      "alert": "Hello from the curl HTTP Sender!",
      "sound": "default"
     }
   }'  \\
   __SERVERURL__/rest/sender
`;
