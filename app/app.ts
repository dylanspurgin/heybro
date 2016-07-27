import {Component, ViewChild} from '@angular/core';
import {Alert, ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {MyGirlPage} from './pages/my-girl/my-girl';
import {SettingsPage} from './pages/settings/settings';
import {LoginPage} from './pages/login/login';
import {FIREBASE_APP_PROVIDERS} from './providers/firebase';
import {PushNotificationService} from './providers/push-notification-service/push-notification-service';


@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    pages: Array<{title: string, component: any}>

    constructor(private platform: Platform, private menu: MenuController,
                public pushNotificationService: PushNotificationService,
                public af: AngularFire) {

        var self = this;
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

            // Authorization listener.
            // Do stuff here that has to happen aften login
            this.af.auth.subscribe(function (auth) {
                console.debug('auth', auth);
                if (auth) {
                    this.pushNotificationService.registerToken();
                }
            });
        });
    }

    openPage(page) {
        this.menu.close();
        this.nav.setRoot(page.component);
    }
}


ionicBootstrap(MyApp, [
    FIREBASE_APP_PROVIDERS
]);
