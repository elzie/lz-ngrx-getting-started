import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from '../state/user.action';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

const getProductFeatureState = createFeatureSelector<UserState>('users');

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
