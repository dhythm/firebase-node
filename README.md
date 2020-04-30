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
npm run serve
```

# Add realtime database
```bash
firebase init database

# Run on local
firebase emulators:start --only database
# GET
curl 'http://localhost:9000/users.json'
# POST
curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
  'http://localhost:9000/users/jack/name.json'
```