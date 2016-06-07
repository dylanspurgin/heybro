import {Page, NavController} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Control, Validators, AbstractControl } from '@angular/common';
import {FirebaseAuth, FirebaseRef, AuthProviders, AuthMethods } from 'angularfire2';

@Page({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {

    error: string;
    signupForm: ControlGroup;
    name: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;

    constructor(public auth: FirebaseAuth,
        fb: FormBuilder,
        @Inject(FirebaseRef) public ref: Firebase) {
            this.signupForm = fb.group({
                'name': ['', Validators.compose([Validators.required])],
                'email': ['', Validators.compose([Validators.required])],
                'password': ['', Validators.compose([Validators.required])]
            });

            this.name = this.signupForm.controls['name'];
            this.email = this.signupForm.controls['email'];
            this.password = this.signupForm.controls['password'];
        }

    signup(_credentials) {
        this.auth.createUser(_credentials)
            .then((authData: FirebaseAuthData) => {
                console.log(authData)

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

            var auth: FirebaseAuthDataPassword = authData.password
            return this.ref.child('users')
                .child(authData.uid)
                .set({
                    "provider": authData.provider,
                    "avatar": auth.profileImageURL,
                    "displayName": auth.name
                })


        }).then((value) => {
            // todo -goto signup2
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }

}
