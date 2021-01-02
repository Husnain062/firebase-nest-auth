export interface CreateUser {
  email: string;
  password: string;
}

export interface GoogleAuth {
  googleAccessToken: string;
  idToken: string;
}
