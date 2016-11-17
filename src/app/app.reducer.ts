import { Action } from '@ngrx/store';

import { AppState, DEFAULT_APP_STATE } from './app.state';
import { AppActions } from './app.actions';

export function appReducer(state: AppState = DEFAULT_APP_STATE, { type, payload }: Action): AppState {
    switch (type) {
        case AppActions.LOAD_FILES:
            return {
                files: [...state.files, ...payload],
                filters: state.filters
            };
        case AppActions.CLEAR_FILES:
            return {
                files: [],
                filters: state.filters
            };
        case AppActions.UPDATE_FILTER:
            return {
                files: state.files,
                filters: payload
            };
        case AppActions.CLEAR_FILTER:
            return {
                files: state.files,
                filters: DEFAULT_APP_STATE.filters 
            };
        default:
            return state;
    }
}