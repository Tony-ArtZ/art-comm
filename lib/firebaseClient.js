"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
var app_1 = require("firebase/compat/app");
exports.firebase = app_1.default;
require("firebase/compat/auth");
if (typeof window !== "undefined" && !app_1.default.apps.length) {
    app_1.default.initializeApp({
        apiKey: "AIzaSyDJRQ3bI8inw7V4wIl_ZCuHNh26HVnsmSE",
        authDomain: "art-comm-97af9.firebaseapp.com",
        projectId: "art-comm-97af9",
        storageBucket: "art-comm-97af9.appspot.com",
        messagingSenderId: "684469929856",
        appId: "1:684469929856:web:7ab8426d637641c9a16365",
    });
    app_1.default.auth().setPersistence(app_1.default.auth.Auth.Persistence.SESSION);
}
