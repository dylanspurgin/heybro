import {Page, NavController} from 'ionic-angular';
import {ViewChild, Inject} from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Control, Validators, AbstractControl } from '@angular/common';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import {SignupPage} from '../../pages/signup/signup';
import {HomePage} from '../../pages/home/home';


@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

    authForm: ControlGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: string;

    constructor(public af: AngularFire,
                fb: FormBuilder,
                public nav: NavController,
                @Inject(FirebaseAuth) public auth: FirebaseAuth) {

        this.authForm = fb.group({
            'email': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];

        auth.subscribe(
            function (authEvent) {
                console.log('Auth event: ', authEvent);
                this.nav.setRoot(HomePage);
            });
        }

    login(value: any) {
        let error = this.error = null;
        this.af.auth.login(value)
        .catch(function (response) {
            error = response;
        });
    }

    gotoSignup() {
        this.nav.setRoot(SignupPage);
    }

}
