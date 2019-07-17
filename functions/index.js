const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");
const app = require("express")();
const isEmpty = require("../helper/isEmpty");
const isEmail = require("../helper/isEmail");

const serviceAccount = {
  type: "service_account",
  project_id: "social-app-48476",
  private_key_id: "52b2ed950805d1f2b0f128e7cda88c4c1d1cfe6d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAmmcpJ/QIpEa0\nsBVCQNcbBX/97oGLmR5OweQc3fok9/CjBfwuek1PTZnn7qHwtmOEU6Okn+Sqdtb4\n7nDhZLaNp2jvYAN27N99mWPgFaEWRVqW++Hpt7UdYeSDHcEbvP91qNwYksMpWOjJ\n9f8vvWzqaKC0tGLP8VCR3zHUOdk346Xl09i44wGUo1glrQFubCGBi/zU4xBI5yZB\nyX/4/0pGdypd+XXvQut8bbGB3uzuO12BsB8Dp3B/q3TuAQ2IWlr8BKb8E7U3BP0d\nlcEUebgtiey8ozGyFvTwHwOZTf/L+xT0zXRXLKlwBGVxwdxef9XShi5QHUFg0a19\nluLuiSGlAgMBAAECggEADlkSQ/h0JKv+5m6oTsS0zDsHKLwP+NMhyl0wU07dV8wD\n/akFpdK6QqT1yQI3xyOsheA93xbYOoiwMArXQZCL9uvYlIiIXt97hghGGUc94QJZ\nTXPF2xrdNQCkvM3GeSdbDSv/UByoHu2UKJjDog36+KVttLiBafCV/3VAlDObsR7f\nmuithDSOUt97VDe2LZuLKCQmar0ci5w4PhLMdrA7PiGsQNWWYHvUV/lVcwsFuiRL\nST+7/yZeIWbhdncqUdnRsOMj+ast92G4y/sx0pLvsSuScf2W7mrmifO4Ori75LDB\nTIXxAANfuP3pkkt+xE2fXlSj/sPKoj61MxFLN5tZAQKBgQD01qoWmMEZvdZiLgUd\n0iTpVI1X9dVMhwiF232cPAmMeXuF5zYX8MaVLQqKTTpHsUTo48tRC1HenrWck2z3\np9IVisT8A+sBsDfXCySGlyd9o0bZAK2FvjKjUjzz3wreVsjPgRc23xpgtr7IZtaj\npru4Sux0VbT12/XqFgOiwqBEJQKBgQDJYiL2ionJvGaUBAdNJ9VBBNtF6ENz5RD7\nOGv4NwdhgyPyAdt3wPe+thLKaNpnddHFk0ZCz8qDVwTQW1CIhKqWl+TY/eJDptal\nz/RIztGo5yoPJsuu+eMY/DFROQ//9JBQuoOEHHAWhgbB1TrZyOagZO5m31pesOmr\noMYxzPQvgQKBgQC90QMy26CxjUz89wK+eOJnB0dBj3SbjQDdjipXCvC4OKK8UGHO\ns7uxgabvTCpH1LZA/AHvxh/lwRO53U4YvsIQM3K+k2cJ+w1/qcLamatjK0fNC0p8\nKtXlaueYhi5N6+hpf4J45wTzQBqvEZOMcsKMgYHKO3w9NBf2MLUG5W8NBQKBgAHL\nZhRcV638h81527bMTBIwQOP2leNKf0Q91Hh5xQ8RZBib+6Ctj4ebh79V/9w8KIpi\nLZYa0+sns1tH9QfCZuLAp8FnQcToj7EakUq0zRl8Ndu8tMPyZhuq46WdpI7bVw3h\nG5rpxfXta9H+XG/kYmm7fIReKSf+25Yz8JAxC1wBAoGAeG7z7TU+MvFC7nyYgVo6\nZuOrLUOVUM3l8SBFjsvlVq7YAqmgED8GgzU7p71VObHAm9M/MWtVXWtc95OoNgOA\ntwtFii3TzIDOVFypJ51jBvR8i7ADoMWUgkCm6l6IfL6IpGncg94p3jKeZ7FCv805\nuAo3HGdVl8ZC+ojdvrSqydo=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-hjz0i@social-app-48476.iam.gserviceaccount.com",
  client_id: "117226193930009894653",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hjz0i%40social-app-48476.iam.gserviceaccount.com"
};

const firebaseConfig = {
  apiKey: "AIzaSyDB-ew53GtHz2xHOKdhp6w8rlwNoWBEXp4",
  authDomain: "social-app-48476.firebaseapp.com",
  databaseURL: "https://social-app-48476.firebaseio.com",
  projectId: "social-app-48476",
  storageBucket: "social-app-48476.appspot.com",
  messagingSenderId: "266129696693",
  appId: "1:266129696693:web:e041b99522b56d68"
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-app-48476.firebaseio.com"
});

const db = admin.firestore();

app.get("/shout", (request, response) => {
  db.collection("shout")
    .get()
    .then(data => {
      let shouts = [];
      data.forEach(doc => {
        shouts.push({
          id: doc.id,
          user: doc.data().user,
          voice: doc.data().voice,
          created_at: doc.data().created_at
        });
      });
      return response.json(shouts);
    })
    .catch(error => {
      console.error(error);
    });
});

app.post("/shout", (request, response) => {
  const payload = {
    user: request.body.user,
    voice: request.body.voice,
    created_at: admin.firestore.Timestamp.fromMillis(new Date())
  };
  db.collection("shout")
    .add(payload)
    .then(doc => {
      return response.json({
        message: `document ${doc.id} created successfully`
      });
    })
    .catch(error => {
      response.status(500).json({ error: "something went wrong" });
      console.error(error);
    });
});

//Signup route
app.post("/signup", (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username
  };

  let errors = {};
  if(isEmpty(newUser.email)){
    errors.email = "Must not be empty";
  }else if(!isEmail(newUser.email)){
    errors.email = "Must be a valid email address";
  }

  if(isEmpty(newUser.password)){
    errors.password = "Must not be empty";
  }
  if(newUser.password !== newUser.confirmPassword){
    errors.confirmPassword = "Password must match";
  }
  if(isEmpty(newUser.username)){
    errors.username = "Must not be empty";
  }

  if(Object.keys(errors).length > 0){
    return response.status(400).json(errors);
  }
  

  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ message: "this username has already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        id: userId,
        username: newUser.username,
        email: newUser.email,
        created_at: admin.firestore.Timestamp.fromMillis(new Date())
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(200).json({ token });
    })
    .catch(error => {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        return response.status(400).json({ error: error.email });
      } else {
        return response.status(500).json({ error: error });
      }
    });
});

exports.api = functions.region("asia-northeast1").https.onRequest(app);
