import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CartProduct } from '../Cartproduct';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../User.interface';
import { Cart } from '../Cart';
import { RequetteService } from '../requette.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartProduct: CartProduct | null = null;
  cartProducts: CartProduct[] = [];
  price: number = 0;
  user!: User;
  cart!: Cart;
  idCart: string = '';
  id: number | undefined = 0;
  id_remove: number = 0;

  constructor(private router: Router, private requetteservice: RequetteService, private cd: ChangeDetectorRef) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.user = currentNavigation?.extras?.state?.['user'];
    this.cart = currentNavigation?.extras?.state?.['cart'];
    this.id = this.user.id;
  }

  validateCart() {
    this.requetteservice.DeleteALLCartProduct(this.cartProducts).subscribe(
      () => {
        alert("votre panier a été validé");
      },
      error => {
        console.error("Erreur lors de la mise a jour du produit", error);
      }
    );

    this.GetCartProducts();


    throw new Error('Method not implemented.');
  }
  removeFromCart(_t24: number) {
    const productToRemove = this.cartProducts[_t24];
    this.id_remove = productToRemove.id;
    if (productToRemove.quantity > 1)
      this.update();
    else
      this.remove();

    this.GetCartProducts();
    alert("votre panier à été modifié");
    throw new Error('Method not implemented.');
  }
  update() {

    this.requetteservice.updateCartProduct(this.id_remove).subscribe(
      () => {
        console.log("mise a jour réussie");
      },
      error => {
        console.error("Erreur lors de la mise a jour du produit", error);
      }
    );
  }

  remove() {

    this.requetteservice.DeleteCartProduct(this.id_remove).subscribe(
      () => {
        console.log("Suppression réussie");
      },
      error => {
        console.error("Erreur lors de la suppression du produit", error);
      }
    );
  }

  gotoList() {

    this.requetteservice.CreateCart(this.id).subscribe(
      response => {
        this.cart = response;
        this.idCart = this.cart.id;


      },
      error => alert('La carte n\'a pas été bien créée')
    )

    this.requetteservice.login(this.user.password).subscribe
      (
        response => {

          this.user = response;

          console.log(this.user.email);

          const navigationExtras: NavigationExtras = {
            state: {
              user: this.user,
              cart: this.cart
            }
          };
          this.router.navigate(['/list1'], navigationExtras);

        },
        error => alert('les Identifiants ne correspondent pas')

      )
    throw new Error('Method not implemented.');
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }


  ngOnInit() {
    console.log(this.cart);

    this.GetCartProducts();
  }

  GetCartProducts() {
    console.log(this.user);
    this.requetteservice.cartProduct().subscribe(
      response => {

        this.cartProducts = response;
        this.cd.detectChanges();

      },
      error => alert('la liste des produits n\'a pas été bien charger')
    );

  }
}
