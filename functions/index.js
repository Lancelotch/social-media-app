const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("../firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-app-48476.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.getShout = functions.https.onRequest((request, response) => {
  admin
    .firestore()
    .collection("shout")
    .get()
    .then(data => {
      let shouts = [];
      data.forEach(doc => {
        shouts.push(doc.data());
      });
      return response.json(shouts);
    })
    .catch(error => {
      console.error(error);
    });
});

exports.newShout = functions.https.onRequest((request, response) => {
  const payload = {
    user: request.body.user,
    voice: request.body.voice,
    created_at: admin.firestore.Timestamp.fromDate(new Date())
  };
  admin
    .firestore()
    .collection("shout")
    .add(payload)
    .then(doc => {
      return response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(error => {
      response.status(500).json({ error: "something went wrong" });
      console.error(error);
    });
});
