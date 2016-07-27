import { Alert, NavController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class PushNotificationService {

    FCMPlugin: any;

    constructor(public af: AngularFire, public nav: NavController) {
        this.FCMPlugin = window.FCMPlugin;
        this.listenForPush();
    }

    listenForPush () {
        // Subscribe to Push Notification
        this.FCMPlugin.onNotification(
            function(data){
                if(data.wasTapped){
                    // Notification was received on device tray and tapped by the user.
                    // TODO - goto Page referenced in Push data
                } else {
                    // Notification was received in foreground.
                    this.doAlert(data.title, data.message);
                }
            },
            function(msg){
                console.debug('onNotification callback successfully registered: ' + msg);
            },
            function(err){
                console.debug('Error registering onNotification callback: ' + err);
            }
        );
    }

    registerToken() {
        this.FCMPlugin.getToken(
            function(token) {
                let user = this.af.database.object('/user');
                user.update({push_token: token});
            },
            function(err){
                console.log('error retrieving token: ' + err);
            }
        );
    }

    doAlert(title: string, message: string) {
        let alert = Alert.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        this.nav.present(alert);
    }

}
