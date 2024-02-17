import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  public getProducts(): BehaviorSubject<Product[]> {
    const products$ = new BehaviorSubject<Product[]>([]);
    try {
      const storedProducts = this.getStoredProducts();
      products$.next(storedProducts);

      return products$;
    } catch (error) {
      products$.error(error);

      return products$;
    }
  }

  public getProductById(id: string): BehaviorSubject<Product | null> {
    const searchedProduct$ = new BehaviorSubject<Product | null>(null);
    try {
      const storedProducts: Product[] = this.getStoredProducts();

      searchedProduct$.next(
        storedProducts.filter((product) => product.id === id)[0]
      );

      if (!searchedProduct$.value)
        throw new Error(`No product found with id: ${id}`);

      return searchedProduct$;
    } catch (error) {
      searchedProduct$.error(error);

      return searchedProduct$;
    }
  }

  public saveProducts(products: Product[]): BehaviorSubject<Product[]> {
    const products$ = new BehaviorSubject<Product[]>([]);
    localStorage.setItem('products', JSON.stringify(products));
    return products$;
  }

  public updateProduct(
    productToUpdate: Product,
    storedProducts: Product[]
  ): BehaviorSubject<Product[]> {
    storedProducts.map((product) => {
      if (product.id !== productToUpdate.id) return;

      product = productToUpdate;
    });

    return this.saveProducts(storedProducts);
  }

  private getStoredProducts(): Product[] {
    const storedProducts = localStorage.getItem('products');

    if (!storedProducts) throw new Error(`No product found`);

    return JSON.parse(storedProducts);
  }
}
