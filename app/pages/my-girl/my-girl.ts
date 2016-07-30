import {Page, NavController} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FormBuilder,  ControlGroup, Control, Validators, AbstractControl } from '@angular/common';


@Page({
  templateUrl: 'build/pages/my-girl/my-girl.html',
})
export class MyGirlPage {

    user: any;
    userRef: FirebaseObjectObservable<any>;
    myGirlForm: ControlGroup;
    cycleDate: AbstractControl;
    cycleNotificationDaysBefore: AbstractControl;
    error: Object;

    constructor(public nav: NavController,
                public af: AngularFire,
                fb: FormBuilder) {

        let self = this;

        this.myGirlForm = fb.group({
            'cycleDate': ['', Validators.compose([Validators.required])],
            'cycleNotificationDaysBefore': ['', Validators.compose([Validators.required])]
        });
        this.cycleDate = this.myGirlForm.controls['cycleDate'];
        this.cycleNotificationDaysBefore = this.myGirlForm.controls['cycleNotificationDaysBefore'];


        af.auth.subscribe(function (auth) {
            if (auth) {
                self.userRef = af.database.object('/users/'+auth.uid);
                self.userRef.subscribe(function(snapshot) {
                    self.user = snapshot;
                });
            }
        });
    }

    updateMyGirl(formValue: any) {
        this.userRef.update({
            cycleDate: formValue.cycleDate,
            cycleNotificationDaysBefore: formValue.cycleNotificationDaysBefore
        });
    }

}
