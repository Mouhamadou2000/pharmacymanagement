import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { RequetteService } from '../requette.service';
import { User } from '../User.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  checkoutForm: any;
  mail: String = "";
  user!: User;

  setProducts(user: User) {
    this.user = user;
  }

  getProducts(): User {
    return this.user;
  }
  constructor(
    private formBuilder: FormBuilder,
    private requetteservice: RequetteService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({

      email: '',
      password: ''
    });
  }
  onSubmit(form: NgForm) {
    const password = form.value.password;
    const email = form.value.email;
    this.requetteservice.login(password).subscribe
      (
        response => {

          this.user = response;
         
          if (this.user.email == email) {
            const navigationExtras: NavigationExtras = {
              state: {
                user: this.user
              }
            };
            this.router.navigate(['/list1'], navigationExtras);
          }
          else
            alert('L\'email ne correspond pas à celui enregistré pour ce mot de passe.');
        },
        error => alert('les Identifiants ne correspondent pas')

      )

  }



}
