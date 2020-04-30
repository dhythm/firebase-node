# Create a new project
```bash
mkdir firebase-node
cd firebase-node

firebase init hosting
firebase init functions
```

# Add functions
```bash
cd functions
npm install --save express

# Run on local
export GOOGLE_APPLICATION_CREDENTIALS="../credentials/serviceAccountKey.json"
npm run serve
```

# Add realtime database
```bash
firebase init database

# Run on local
# https://github.com/firebase/firebase-tools/issues/1485#issuecomment-510123852
firebase emulators:start --only database
# GET
curl 'http://localhost:9000/users.json'
# POST
curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
  'http://localhost:9000/users/jack/name.json'
# OR
curl -X PUT -d @users.json 'http://localhost:9000/users.json'
```

