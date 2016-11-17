import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { APP_ROUTES } from './app.routes';
import { appReducer } from './app.reducer';

export const APP_IMPORTS = [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.provideStore(appReducer)
];