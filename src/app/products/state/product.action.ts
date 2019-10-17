import { Action } from '@ngrx/store';
import { Product } from '../product';

// List all product actions as named constants
export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product'
}


// Build the Action Creators
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;

    constructor(public payload: boolean) { }
}
export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;

    // Imports '../product'
    constructor(public payload: Product) { }
}
export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;

    // Needs no payload. Sets to null.
    constructor() { }
    // Constructor not really needed, bcus typescript provides an empty constructor.
}
export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
    // Define an initialized product, so no payload needed.
    // Constructor not really needed, bcus typescript provides an empty constructor.
}


// Define a type to Union all Action Creators.
export type ProductActions = ToggleProductCode
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct;
//  ^ Using the Pipe-character to define the Union. Here read as 'Or'.
