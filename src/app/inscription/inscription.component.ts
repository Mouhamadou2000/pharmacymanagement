import { Component } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras, Router ,RouterModule} from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../User.interface';
import { RequetteService } from '../requette.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule,HttpClientModule,ReactiveFormsModule,RouterModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  userJSON: any;
  responseJSON!: User;
  checkoutForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private requetteservice: RequetteService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      lastname: '',
      firstname: '',
      email: '',
      profile: '',
      password: '',
      repasswd: '',
      active: ''
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value); 
    const password = form.value.password;
    const repassword = form.value.repasswd;
    if (password == repassword) {
      const user1: User =
      {
        id: undefined,
        lastname: form.value.lastname,
        firstname: form.value.firstname,
        email: form.value.email,
        profile: form.value.profile,
        password: form.value.password,
        active: form.value.active
      }
      this.requetteservice.postUserData(user1).subscribe
        (
          response => {
            console.log('Success!', response);
            this.responseJSON = response as User;
            const navigationExtras: NavigationExtras = {
              state: {
                response: this.responseJSON
              }
            };
            this.router.navigate(['/list1'], navigationExtras);
          },
          error => console.error('Error!', error)
        )
    }
    else {
      alert("Mot de Passe différents");
    }
  }

}
