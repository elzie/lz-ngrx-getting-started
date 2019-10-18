import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    // Unsubscribe: takeWhile unsubscribes
    // Watch for changes from the Service
    this.store.pipe(select(fromProduct.getCurrentProduct),
      takeWhile(() => this.componentActive)).subscribe(
        currentProduct => this.selectedProduct = currentProduct
        // When current Product changes, this code sets the 'Local selected Product'
        // property to the current selected Product from the Store.
      );
    /**
     * this.sub = this.productService.selectedProductChanges$.subscribe(
     * selectedProduct => this.selectedProduct = selectedProduct
     * );
     */
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    // TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));

    /**
     * this.store.dispatch({
     * type: 'TOGGLE_PRODUCT_CODE',
     * payload: value
     * });
     */
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
    // ^ pass in selected Product as payload
    // this.productService.changeSelectedProduct(product);
  }

}
