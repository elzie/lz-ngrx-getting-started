import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.action';
import * as fromProducts from './product.reducer';

// Strongly typing state also gives options/hints in VSCode.

// extend the interface, to include the original slice of state
export interface State extends fromRoot.State {
    products: fromProducts.ProductState;
}

/**
 * Must be together in this order
 */
const getProductFeatureState = createFeatureSelector<fromProducts.ProductState>('products');

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    });
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

/**
 * Bottomline;
 * When building selectors, define one for each bit of state that is accessed from the store
 * and compose them as needed by your Components and Services.
 */
/**
 * Must be together in this order
 */

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);
