import {Page, NavController} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

    user: FirebaseObjectObservable<any>;

    constructor(public nav: NavController,
                af: AngularFire) {

        this.user = af.database.object('/user');
        console.debug('user',this.user);
    }
}
