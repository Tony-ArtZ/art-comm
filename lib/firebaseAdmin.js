"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
var firebaseAdmin = require("firebase-admin");
exports.firebaseAdmin = firebaseAdmin;
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
