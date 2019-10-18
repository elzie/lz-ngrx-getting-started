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
import { of } from 'rxjs';

// Take an Action
// Do some work
// Return a new Action

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );
}
