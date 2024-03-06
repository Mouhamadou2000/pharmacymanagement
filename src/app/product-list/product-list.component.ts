import { Component, OnInit } from '@angular/core';
import { Product, products } from '../products';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequetteService } from '../requette.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../User.interface';
import { Cart } from '../Cart';
import { CartProduct } from '../Cartproduct';




@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  imports: [RouterModule, CommonModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  user!: User;
  id: number | undefined = 0;
  cart!: Cart;
  cartproduct!: CartProduct;
  idCart: string = '';

  constructor(
    private requetteservice: RequetteService,
    private router: Router,
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.user = currentNavigation?.extras?.state?.['user'];
    this.cart = currentNavigation?.extras?.state?.['cart'];
    this.id = this.user.id;
  }

  goToCart() {
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
          const navigationExtras: NavigationExtras = {
            state: {
              user: this.user,
              cart: this.cart
            }
          };
          this.router.navigate(['/cart1'], navigationExtras);

        },
        error => alert('les Identifiants ne correspondent pas')
      )

    throw new Error('Method not implemented.');
  }
  setProducts(products: Product[]) {
    this.products = products;
  }

  getProducts(): Product[] {
    return this.products;
  }
  ngOnInit() {
    console.log(this.user);
    this.requetteservice.ProductList().subscribe(
      response => {
        
        this.products = response;
      },
      error => alert('la liste des produits n\'a pas été bien charger')
    );
    this.requetteservice.CreateCart(this.id).subscribe(
      response => {
        this.cart = response;
        this.idCart = this.cart.id;
      },
      error => alert('La carte n\'a pas été bien créée')
    )
  }
  addToCart(product: Product) {
    this.requetteservice.CreateCartProduct(product.id, this.idCart).subscribe(
      response => {
        this.cartproduct = response;
        console.log(this.cartproduct);

        window.alert('Your product has been added to the cart!');
      },
      error => alert('La carte n\'a pas été bien créée')
    )
  }
}
