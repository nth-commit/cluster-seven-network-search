import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SearchRequestService } from '../../services/search-request.service';
import { SearchRequest } from '../../services/models/search-request.model';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class Home {

    constructor(
        private router: Router,
        private searchRequestService: SearchRequestService
    ) { }

    navigateToSearchRequest({ searchRequest }: any) {
        this.router.navigate(['/details', (searchRequest as SearchRequest).index])
    }
}