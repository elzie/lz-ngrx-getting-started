import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../product';
import { ProductService } from '../../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state';
import * as productActions from '../../state/product.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  // Only updates the view, if new input event is passed -or a DOM event is raised in component or its children.
})
export class ProductShellComponent implements OnInit {
  componentActive = true;

  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  selectedProduct$: Observable<Product>;

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }

  clearProduct(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }
}
