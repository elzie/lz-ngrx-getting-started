import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.action';

// State for this feature ( product)
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};
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
        currentProductId: action.payload.id
        // Passing a REFERENCE to our current Product into the store,
        // using the 'Spread' operator(...), to prevent mutation in the store.
      };

    case ProductActionTypes.ClearCurrentProduct:
      console.log('existing state: ', JSON.stringify(state));
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      console.log('existing state: ', JSON.stringify(state));
      return {
        ...state,
        currentProductId: 0
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
    case ProductActionTypes.UpdateProductSuccess:
      // Using map method, to create a new array instead of mutating an existing array.
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };
    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };
    /**
     * case 'TOGGLE_PRODUCT_CODE':
     *     console.log('existing state: ', JSON.stringify(state));
     *     console.log('payload: ', action.payload);
     *     return {
     *       ...state,
     *       showProductCode: action.payload
     *     };
     */
    default:
      return state;
  }
}
