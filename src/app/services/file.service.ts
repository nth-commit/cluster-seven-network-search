import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { NETWORK_SEARCH_API_BASE } from './../app.constants';
import { SearchRequestService } from './search-request.service';
import { File } from './models/file.model';
import { PagedResult } from './models/paged-result.model';

const PAGE_SIZE = 50;
const REQUEST_OPTIONS = new RequestOptions({
    headers: new Headers({
        'ContentType': 'application/json'
    })
});

@Injectable()
export class FileService {

    constructor(
        private http: Http,
        private searchRequestService: SearchRequestService
    ) { }

    getPage(searchRequestIndex: number, pageNumber: number): Observable<PagedResult<File>> {
        return this.searchRequestService
            .findByIndex(searchRequestIndex)
            .flatMap<PagedResult<File>>(searchRequest => {
                if (!searchRequest) {
                    throw `Search request with index ${searchRequestIndex} not found.`;
                }

                let startIndex = pageNumber * PAGE_SIZE;
                let files: Observable<File[]> = null;
                if (startIndex >= searchRequest.count) {
                    files = Observable.from([[]])
                } else {
                    files = this.getFiles(searchRequestIndex, startIndex);
                }

                return files.map<PagedResult<File>>(files => ({
                    items: files,
                    pageNumber: pageNumber,
                    pageSize: PAGE_SIZE,
                    totalItems: searchRequest.count
                }));
            });
    }

    private getFiles(searchRequestIndex: number, startIndex: number): Observable<File[]> {
        let path = `/searches/${searchRequestIndex}/results`;
        let query = `start=${startIndex}&size=${PAGE_SIZE}`;
        let url = `${NETWORK_SEARCH_API_BASE}${path}?${query}`;
        return this.http.get(url, REQUEST_OPTIONS)
            .map(r => r.json() as File[])
            .cache();
    }
}