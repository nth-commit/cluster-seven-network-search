import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { AppActions } from '../../app.actions';

import { FileService } from '../../services/file.service';
import { SearchRequest } from '../../services/models/search-request.model';
import { File } from '../../services/models/file.model';
import { PagedResult } from '../../services/models/paged-result.model';
import { FileFilterPipe, FileFilterArgs } from '../../pipes/file-filter.pipe';

@Component({
    selector: 'search-details',
    templateUrl: './search-details.html',
    styleUrls: ['./search-details.css']
})
export class SearchDetails implements OnInit, OnDestroy {

    private _lastPage$: BehaviorSubject<PagedResult<File>> = new BehaviorSubject(null);

    private searchRequest$: Observable<SearchRequest>;
    private files$: Observable<File[]>;
    private filteredFiles$: Observable<File[]>;
    private filters$: Observable<FileFilterArgs>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private fileService: FileService,
        private fileFilterPipe: FileFilterPipe
    )
    {
        this.files$ = this.store.select(s => s.files);
        this.filters$ = this.store.select(s => s.filters);

        this.filteredFiles$ = Observable
            .combineLatest(this.files$, this.filters$)
            .map(([files, filter]) => this.fileFilterPipe.transform(files, filter));
    }

    ngOnInit() {
        this.searchRequest$ = this.route.data.map((data: { searchRequest: SearchRequest }) => data.searchRequest);
        this.loadNextPage();
    }

    ngOnDestroy() {
        this.store.dispatch(AppActions.clearFiles());
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
                    this.store.dispatch(AppActions.loadFiles(nextPage.items));
                }
            });
    }

    updateFilter(filter: FileFilterArgs) {
        this.store.dispatch(AppActions.updateFilter(filter));
    }
}