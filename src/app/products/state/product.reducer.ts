import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.action';

// Strongly typing state also gives options/hints in VSCode.

// extend the interface, to include the original slice of state
export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};
/**
 * Must be together in this order
 */
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);
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

// Add type where state is passed in.               and also for the ReturnType!
export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      console.log('existing state: ', JSON.stringify(state));
      console.log('payload: ', action.payload);
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      console.log('existing state: ', JSON.stringify(state));
      console.log('payload: ', action.payload);
      return {
        ...state,
        currentProduct: { ...action.payload }
        // Passing a REFERENCE to our current Product into the store,
        // using the 'Spread' operator(...), to prevent mutation in the store.
      };

    case ProductActionTypes.ClearCurrentProduct:
      console.log('existing state: ', JSON.stringify(state));
      return {
        ...state,
        currentProduct: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      console.log('existing state: ', JSON.stringify(state));
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    /**
     * case 'TOGGLE_PRODUCT_CODE':
          console.log('existing state: ', JSON.stringify(state));
          console.log('payload: ', action.payload);
          return {
            ...state,
            showProductCode: action.payload
          };
     */
    default:
      return state;
  }
}
