import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routes';

export const APP_IMPORTS = [
    FormsModule,
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES)
];