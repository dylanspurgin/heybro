import {Page, NavController, Alert} from 'ionic-angular';
import {ViewChild, Inject} from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Control, Validators, AbstractControl } from '@angular/common';
import { AngularFire, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';
import {SignupPage} from '../../pages/signup/signup';
import {HomePage} from '../../pages/home/home';


@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

    authForm: ControlGroup;
    email: AbstractControl;
    password: AbstractControl;
    error: Object;
    nav: NavController;
    user: FirebaseObjectObservable<any>;

    constructor(public af: AngularFire,
                fb: FormBuilder,
                nav: NavController) {

        this.authForm = fb.group({
            'email': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
        this.nav  = nav;
        this.user = af.database.object('/user');



        this.af.auth.subscribe(function (auth) {
            console.debug('auth',auth);
            if (auth) {
                // I think this means we're logged in
                this.nav.setRoot(HomePage);
            }
        });
    }

    login(value: any) {
        let error = this.error = null;
        let af = this.af;
        let token = this.token;
        let nav =  this.nav;
        this.af.auth.login(value)
            .then(function (response) {
                console.debug('logged in', response);
                nav.setRoot(HomePage);
            })
            .catch(function (response) {
                console.debug('Auth error', response);
                error = response;
            });
    }

}
