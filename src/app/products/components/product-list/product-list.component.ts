import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';
  // Things to Recieve, not as observables, but as straight values.
  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  // Events we want to be able to output from out Component
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
