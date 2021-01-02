import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as admin from "firebase-admin";
import {environment} from "./environment" 
import { AppModule } from './src/app.module';
 
const expressServer = express();
 

firebase.initializeApp(environment.firebase);
admin.initializeApp(environment.firebase)
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
 
await app.init();
}
  
export const api = functions.region('europe-west1')
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  }); 