import {Page, NavController} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { SignupPage } from '../signup/signup';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  constructor(public nav: NavController,
              public af: AngularFire) {}

  logout () {
      this.af.auth.logout();
      this.nav.setRoot(SignupPage);
  }

}
