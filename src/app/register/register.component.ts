import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import * as $ from 'jquery';
import {LogIn} from '../_entities/log-in';
import {SignUp} from '../_entities/sign-up';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnInit {

  loginForm: any = {};
  registerForm: any = {};
  logIn: LogIn;
  signUp: SignUp;
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#signup').click(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#first').fadeOut('fast', function() {
        $('#second').fadeIn('fast');
      });
    });

    // tslint:disable-next-line:only-arrow-functions
    $('#signin').click(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('#second').fadeOut('fast', function() {
        $('#first').fadeIn('fast');
      });
    });

    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      $('form[name=\'login\']').validate({
        rules: {
          username: {
            required: true,
          },
          password: {
            required: true,
          }
        },
        messages: {
          username: 'Please enter a username',

          password: {
            required: 'Please enter password',
          }

        },
        submitHandler(form) {
          form.submit();
        }
      });
    });


    // tslint:disable-next-line:only-arrow-functions
    $(function() {

      $('form[name=\'registration\']').validate({
        rules: {
          username: 'required',
          password: 'required',
          email: {
            required: true,
            email: true
          },
        },

        messages: {
          username: 'Please enter your username',
          password: 'Please provide a password',
          email: 'Please enter a valid email address'
        },

        submitHandler(form) {
          form.submit();
        }
      });
    });

  }

  onSubmitLogin() {
    this.logIn = new LogIn(this.loginForm.username, this.loginForm.password);
    this.userService.login(this.logIn).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/home']);
      },
      error1 => {
        this.errorMessage = error1.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  onSubmitRegister() {
    this.signUp = new SignUp(this.registerForm.username, this.registerForm.password, this.registerForm.email);
    this.userService.register(this.signUp).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
