import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { NETWORK_SEARCH_API_BASE } from './../app.constants';
import { SearchRequest } from './models/search-request.model';

const REQUEST_OPTIONS = new RequestOptions({
    headers: new Headers({
        'ContentType': 'application/json'
    })
});

@Injectable()
export class SearchRequestService {

    public searchRequests$: Observable<SearchRequest[]>;

    constructor(
        private http: Http
    )
    {
        this.searchRequests$ = this.http.get(`${NETWORK_SEARCH_API_BASE}/searches`, REQUEST_OPTIONS)
            .map(r => {
                let result = r.json() as SearchRequest[];
                result.forEach((searchRequest, index) => searchRequest.index = index);
                return result;
            })
            .cache();
    }

    findByIndex(index: number): Observable<SearchRequest> {
        return this.searchRequests$
            .map(searchRequests => searchRequests.filter(s => s.index === index)[0])
            .first();
    }
}