import { NgModule } from '@angular/core';

import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';
import { APP_DECLARATIONS } from './app.declarations';
import { AppComponent } from './app.component';

@NgModule({
    imports: APP_IMPORTS,
    providers: APP_PROVIDERS,
    declarations: [
        AppComponent,
        ...APP_DECLARATIONS
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }