"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebase = void 0;
const admin = require("firebase-admin");
const initializeFirebase = (configService) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: configService.get('FIREBASE_PROJECT_ID'),
                clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
                privateKey: configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
            }),
        });
    }
    return admin;
};
exports.initializeFirebase = initializeFirebase;
//# sourceMappingURL=firebase.config.js.map