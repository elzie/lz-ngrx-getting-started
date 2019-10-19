/**
 * npm install @ngrx/effects
 * RxJS Operators
 *
 * switchMap  |  Cancels the current subscription/request and can
 *               cause race condition. Use for getRequests or cancelableRequests
 *               like searches.
 *
 * concatMap  |  Runs subscriptions/requests in order and is less performant.
 *               Use for get, post, and put requests when order is important.
 *
 * mergeMap   |  Runs subscriptions/requests in parallel.
 *               Use for put, post and delete methods when order is not important.
 *
 * exhaustMap | Ignores all subsequent subscriptions/requests untill it completes.
 *              Use for login, when you do not want more request until the initial
 *              one is complete.
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { Product } from '../product';
import * as productActions from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

// Build effect service and inject Actions
@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    // Specify a property with the Effect decorator
    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        // Build the effect
        ofType(productActions.ProductActionTypes.Load),
        // Using mergeMap to merge and flatten the 2 Observables
        mergeMap((action: productActions.Load) =>
            // Calls product service to update product
            this.productService.getProducts().pipe(
                map((products: Product[]) =>
                    // If success, dispatch Product Update Success Action
                    (new productActions.LoadSuccess(products))),
                catchError(err =>
                    // If Unsuccessfull, dispatch Product Update Failure Action
                    of(new productActions.LoadFail(err)))
            ))
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );

    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.createProduct(product).pipe(
                map(newProduct => (new productActions.CreateProductSuccess(newProduct))),
                catchError(err => of(new productActions.CreateProductFail(err)))
            )
        )
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((productId: number) =>
            this.productService.deleteProduct(productId).pipe(
                map(() => (new productActions.DeleteProductSuccess(productId))),
                catchError(err => of(new productActions.DeleteProductFail(err)))
            )
        )
    );
}
