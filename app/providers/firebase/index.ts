import {
  AuthMethods,
  defaultFirebase,
  FIREBASE_PROVIDERS,
  firebaseAuthConfig,
  AuthProviders
} from 'angularfire2';


export const FIREBASE_APP_PROVIDERS: any[] = [
  FIREBASE_PROVIDERS,
  defaultFirebase({
      apiKey: "AIzaSyAuFTR7z6gnq1agVkM0j1mtdUBEthRXUfg",
      authDomain: "hey-bro.firebaseapp.com",
      databaseURL: "https://hey-bro.firebaseio.com",
      storageBucket: "hey-bro.appspot.com"
  }),
  firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password
  })
];
