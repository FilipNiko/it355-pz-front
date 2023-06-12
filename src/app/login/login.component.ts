import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudServiceService } from '../services/crud-service.service';
import { Korisnik } from '../modeli/korisnik';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForma: FormGroup;
  registracijaForma: FormGroup;
  korisnici: Korisnik[] = [];
  korisniciProvera: Korisnik[] = [];
  loginKorisnik: Korisnik;
  greska: boolean = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessageLogin = '';

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessageRegister = '';
  roles: string[] = [];


  constructor(fb: FormBuilder, private crudService: CrudServiceService, private authService: AuthService, private storageService: StorageService) {
    this.loginForma = fb.group({
      "username": ['', Validators.required],
      "password": ['', Validators.required]
    }),

      this.registracijaForma = fb.group({
        "username": ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        "email": ['', Validators.compose([Validators.required, Validators.email])],
        "password": ['', Validators.required],
        "repassword": ['', Validators.required],
      }, { validator: ConfirmedValidator('password', 'repassword') }
      )

  }

  daLiJeUlogovan(): boolean {
    return this.storageService.isLoggedIn();
  }

  izlogujSe() {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
  

  get f() {
    return this.registracijaForma.controls;
  }



  ulogujSe(): void {

    let username: string = this.loginForma.get("username")?.value;
    let password: string = this.loginForma.get("password")?.value;

   /* this.crudService.getKorisnikZaLogin(username, password).subscribe((data) => {
      this.korisnici = data;
      if (this.korisnici.length != 0) {
        this.loginKorisnik = this.korisnici[0];
        this.authService.upisiKorisnika(this.loginKorisnik)
        this.greska = false;
        let ref = document.getElementById('cancelLog');
        ref?.click();
        this.loginForma.reset();
      } else {
        this.greska = true;
        this.loginForma.reset();

      }
    })*/


    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        console.log(data);
        let ref = document.getElementById('cancelLog');
        ref?.click();
        this.loginForma.reset();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        //window.location.reload();
      },
      error: err => {
        this.errorMessageLogin = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  registrujSe(): void {
    let username = this.registracijaForma.get("username")?.value;
    let email = this.registracijaForma.get("email")?.value;
    let password = this.registracijaForma.get("password")?.value;


   /* this.crudService.getPoUsername(username).subscribe((data) => {
      this.korisniciProvera = data;
      if (this.korisniciProvera.length != 0) {
        alert("Već postoji korisnik sa unetim korisničkim imenom!")
      } else {
        this.crudService.dodajNovogKorisnika(new Korisnik(username, email, password, false)).subscribe((data) => {
          alert("Uspešno ste se registrovali. Sada se možete ulogovati!")
          let ref = document.getElementById('cancelReg');
          ref?.click();
          this.registracijaForma.reset();
          this.korisnici.unshift(data);

        })
      }
    })*/

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        alert("Uspešno ste se registrovali. Sada se možete ulogovati!")
        let ref = document.getElementById('cancelReg');
        ref?.click();
        this.registracijaForma.reset();
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessageRegister = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  
}




function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
