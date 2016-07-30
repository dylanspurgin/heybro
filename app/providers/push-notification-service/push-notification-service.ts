import { Alert, NavController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

declare var window: any;

@Injectable()
export class PushNotificationService {

    FCMPlugin: any;

    constructor(public af: AngularFire) {
        this.FCMPlugin = window.FCMPlugin;
    }

    registerToken(uid) {
        let self = this;
        if (!this.FCMPlugin) {
            console.debug('Firebase Cloud Messaging plugin not found when attempting to register token.');
            return;
        }
        this.FCMPlugin.getToken(
            function(token) {
                let user = self.af.database.object('/users/'+uid);
                user.update({push_token: token});
            },
            function(err){
                console.error('error retrieving token: ' + err);
            }
        );
    }

    listenForPush (callback) {
        if (!this.FCMPlugin) {
            return;
        }
        // Subscribe to Push Notification
        this.FCMPlugin.onNotification(
            function(data){
                if(data.wasTapped){
                    // Notification was received on device tray and tapped by the user.
                    // TODO - goto Page referenced in Push data
                } else {
                    // Notification was received in foreground.
                    callback(data);
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

}
