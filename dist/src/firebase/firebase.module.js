"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'FIREBASE_ADMIN',
                useFactory: (configService) => {
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
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: ['FIREBASE_ADMIN'],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map