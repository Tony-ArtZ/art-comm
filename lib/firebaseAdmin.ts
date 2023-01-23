import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from './secret.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: publicRuntimeConfig.PRIVATE_KEY,
      clientEmail: publicRuntimeConfig.CLIENT_EMAIL,
      projectId: publicRuntimeConfig.PRIVATE_KEY_ID,
    }),
    databaseURL: 'https://art-comm-97af9.firebaseio.com',
  });
}

export { firebaseAdmin };