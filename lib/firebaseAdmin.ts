const admin = require("firebase-admin");
const serviceAccount = require("./secrets.json");

export const VerifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://art-comm-97af9.firebaseio.com",
    });
  }
  return admin
    .auth()
    .VerifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};
