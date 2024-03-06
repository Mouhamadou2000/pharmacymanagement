import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './products';
import { User } from './User.interface';
import { Cart } from './Cart';
import { CartProduct } from './Cartproduct';

@Injectable({
  providedIn: 'root'
})
export class RequetteService {
  
  constructor(private http: HttpClient) {}

  postUserData(user: any) {
    const url = 'http://localhost:8080/pharmacy/User';
    
    return this.http.post(url, user);
   
  }

  login( password: any): Observable<User>  {
    
    
    const url = `http://localhost:8080/pharmacy/User/login/${password}`;
    return this.http.get<User>(url);
   
  }

  ProductList( ): Observable<Product[]>  {
    
    
    const url = `http://localhost:8080/pharmacy/Product`;
    return this.http.get<Product[]>(url);
   
  }
  cartProduct( ): Observable<CartProduct[]>  {
    
    
    const url = `http://localhost:8080/pharmacy/CartProduct`;
    return this.http.get<CartProduct[]>(url);
   
  }

  CreateCart(id:any): Observable<Cart>  {
    
    
    const url = `http://localhost:8080/pharmacy/Cart/Creation/${id}`;
    return this.http.get<Cart>(url);
   
  }

  CreateCartProduct(idProduct:any,idCart:any): Observable<CartProduct>  {
    
    
    const url = `http://localhost:8080/pharmacy/CartProduct/${idProduct}/${idCart}`;
    return this.http.get<CartProduct>(url);
   
  }
  DeleteCartProduct(id: any) {
    const url = `http://localhost:8080/pharmacy/CartProduct/${id}`;
    return this.http.delete(url);
  }

  updateCartProduct(id: any) {
    const url = `http://localhost:8080/pharmacy/CartProduct/${id}`;
    return this.http.put(url,id);
  }

  DeleteALLCartProduct(cartProducts: any) {
    const url = `http://localhost:8080/pharmacy/CartProduct/DeleteAll`;
    return this.http.put(url,cartProducts);
  }
}
