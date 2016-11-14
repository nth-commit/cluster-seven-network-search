import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { SearchRequestService } from '../../services/search-request.service';
import { FileService } from '../../services/file.service';
import { SearchRequest } from '../../services/models/search-request.model';
import { File } from '../../services/models/file.model';
import { PagedResult } from '../../services/models/paged-result.model';

@Component({
    selector: 'search-details',
    templateUrl: './search-details.html',
    styleUrls: ['./search-details.css']
})
export class SearchDetails implements OnInit {

    private _lastPage$: BehaviorSubject<PagedResult<File>> = new BehaviorSubject(null);
    private _files$: BehaviorSubject<File[]> = new BehaviorSubject([]);

    private searchRequest$: Observable<SearchRequest>;
    private files$: Observable<File[]> = this._files$.asObservable();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private searchRequestService: SearchRequestService,
        private fileService: FileService
    ) { }

    ngOnInit() {
        this.searchRequest$ = this.route.data.map((data: { searchRequest: SearchRequest }) => data.searchRequest);
        this.loadNextPage();
    }

    loadNextPage() {
        this.searchRequest$
            .flatMap(searchRequest => {
                let page = this._lastPage$.getValue();
                return this.fileService.getPage(
                    searchRequest.index,
                    page ? page.pageNumber + 1 : 0);
            })
            .subscribe(nextPage => {
                if (nextPage.items.length > 0) {
                    this._lastPage$.next(nextPage);
                    this._files$.next([...this._files$.getValue(), ...nextPage.items])
                }
            });
    }
}