import {Page, NavController} from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FormBuilder,  ControlGroup, Control, Validators, AbstractControl } from '@angular/common';


@Page({
  templateUrl: 'build/pages/my-girl/my-girl.html',
})
export class MyGirlPage {

    user: FirebaseObjectObservable<any>;

    myGirlForm: ControlGroup;
    cDate: AbstractControl;
    error: Object;

    constructor(public nav: NavController,
                public af: AngularFire,
                fb: FormBuilder) {

        this.myGirlForm = fb.group({
            'cDate': ['', Validators.compose([Validators.required])]
        });
        this.cDate = this.myGirlForm.controls['cDate'];

        this.user = af.database.object('/user');
        this.af = af;
    }

    updateMyGirl(formValue: any) {
        this.user.update({cDate: formValue.cDate});
    }

}
