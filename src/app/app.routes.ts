import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { SearchDetails } from './pages/search-details/search-details';

import { SearchRequestResolve } from './resolves/search-request.resolve';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'details/:index',
        component: SearchDetails,
        resolve: {
            searchRequest: SearchRequestResolve
        }
    },
    {
        path: '**',
        component: Home
    }
];