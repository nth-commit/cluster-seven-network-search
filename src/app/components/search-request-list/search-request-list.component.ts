import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

import { SearchRequest } from '../../services/models/search-request.model';

const DOMAIN_SPLIT_CHAR = '\\';

@Component({
    selector: 'search-request-list',
    templateUrl: './search-request-list.component.html',
    styleUrls: ['./search-request-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRequestListComponent {
    @Input() searchRequests: SearchRequest[] = [];
    @Output() searchRequestSelected = new EventEmitter();

    constructor()
    {
        console.log('search-request-list initialized');
    }
    
    selectSearchRequest(searchRequest: SearchRequest) {
        this.searchRequestSelected.emit({ searchRequest });
    }

    getRequesterName(searchRequest: SearchRequest): string {
        return searchRequest.requester.split(DOMAIN_SPLIT_CHAR).pop();
    }

    getRequesterDomain(searchRequest: SearchRequest): string {
        let domainParts = searchRequest.requester.split(DOMAIN_SPLIT_CHAR);
        domainParts.pop();
        return domainParts
            .map(s => s + DOMAIN_SPLIT_CHAR)
            .join();
    }
}