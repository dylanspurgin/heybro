import { bootstrap } from '@angular/platform-browser-dynamic';
import {ViewChild} from '@angular/core';
import {App, MenuController, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {MyGirlPage} from './pages/my-girl/my-girl';
import {SettingsPage} from './pages/settings/settings';
import {LoginPage} from './pages/login/login';

import {
        FIREBASE_PROVIDERS, defaultFirebase,
        AngularFire, firebaseAuthConfig, AuthProviders,
        AuthMethods
    } from 'angularfire2';

@App({
  templateUrl: 'build/app.html',
  providers: [
      FIREBASE_PROVIDERS,
      defaultFirebase('https://heybro.firebaseio.com'),
      firebaseAuthConfig({
          provider: AuthProviders.Password,
          method: AuthMethods.Password
      })
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  // @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform, private menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Girl', component: MyGirlPage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage = page;
    this.menu.close();
  }
}
