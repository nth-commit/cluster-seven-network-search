import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { SearchRequestService } from './../services/search-request.service';
import { SearchRequest } from './../services/models/search-request.model';

@Injectable()
export class SearchRequestResolve implements Resolve<SearchRequest> {

    constructor(
        private router: Router,
        private searchRequestService: SearchRequestService) { }

    resolve(route: ActivatedRouteSnapshot): Promise<SearchRequest>|boolean {
        let index = parseInt(route.params['index'], 10);
        if (isNaN(index)) {
            return false;
        }

        return this.searchRequestService
            .findByIndex(index)
            .toPromise();
    }
}