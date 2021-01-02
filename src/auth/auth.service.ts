import { Injectable } from '@nestjs/common';
import { CreateUser, GoogleAuth } from './auth.interface';
import firebase from 'firebase';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World of Auth!';
  }

  create(user: CreateUser): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          firebase.auth().currentUser.sendEmailVerification();
          resolve(user);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  loginFacebook(fbAccessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var cred = firebase.auth.FacebookAuthProvider.credential(fbAccessToken);
      firebase
        .auth()
        .signInWithCredential(cred)
        .then(function (user) {
          resolve(user);
        })
        .catch(function (error) {
          resolve(error);
        });
    });
  }

  loginGoogle(googleAuth: GoogleAuth): Promise<any> {
    return new Promise((resolve, reject) => {
      var cred = firebase.auth.GoogleAuthProvider.credential(
        googleAuth.idToken,
      );
      firebase
        .auth()
        .signInWithCredential(cred)
        .then(function (user) {
          resolve(user);
        })
        .catch(function (error) {
          resolve(error);
        });
    });
  }

  login(user: CreateUser): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          if (user.user.emailVerified) {
            resolve(user);
          } else {
            let obj = {
              code: 304,
              message: 'Email not verified!',
            };
            resolve(obj);
          }
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  profile(token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .verifyIdToken(token.authorization)
        .then((user) => {
          resolve(user);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  resetPassword(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email.email)
        .then(() => {
          let obj = {
            code: 200,
            message: 'Reset email send!',
          };
          resolve(obj);
        })
        .catch(function (error) {
          resolve(error);
        });
    });
  }

  logout(token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .verifyIdToken(token.authorization)
        .then((user) => {
          let obj = {
            code: 200,
            message: 'User logout sucessfully!',
          };
          resolve(obj);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }
}
