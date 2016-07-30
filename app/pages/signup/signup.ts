import {Page, NavController} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Control, Validators, AbstractControl } from '@angular/common';
import {FirebaseAuth, AngularFire, FirebaseRef, AuthProviders, AuthMethods } from 'angularfire2';

import {HomePage} from '../../pages/home/home';

@Page({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {

    error: Object;
    signupForm: ControlGroup;
    displayName: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;
    nav: NavController;
    af: AngularFire;

    constructor(public auth: FirebaseAuth,
                af: AngularFire,
                fb: FormBuilder,
                nav: NavController) {
        this.signupForm = fb.group({
            'displayName': ['', Validators.compose([Validators.required])],
            'email': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.displayName = this.signupForm.controls['displayName'];
        this.email = this.signupForm.controls['email'];
        this.password = this.signupForm.controls['password'];

        this.nav = nav;
        this.af = af;
    }

    signup(_credentials) {
        this.auth.createUser(_credentials)
            .then((authData) => {
                console.log(authData);

                _credentials.created = true;

                return this.createUser(_credentials);

            })
            .catch((error) => {
                this.error = error
                console.log(error)
            });
      }


    /**
     * this logs in the user using the form credentials.
     *
     * if the user is a new user, then we need to create the user AFTER
     * we have successfully logged in
     *
     * @param _credentials {Object} the email and password from the form
     * @param _event {Object} the event information from the form submit
     */
    createUser(credentials) {
        // login usig the email/password auth provider
        this.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
            console.log(authData)
            const user = this.af.database.object('/users/'+authData.uid);
            var names = credentials.displayName.split(' ');
            user.set({
                first_name: names[0],
                last_name: names[1] || '',
                email: credentials.email,
                uid: authData.uid,
                auth_provider: authData.provider
            });
        }).then((value) => {
            this.nav.setRoot(HomePage);
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }

}
