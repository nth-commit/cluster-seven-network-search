import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

import { File } from '../../services/models/file.model';
import { SearchRequest } from '../../services/models/search-request.model'

@Component({
    selector: 'file-list',
    templateUrl: '/file-list.component.html',
    styleUrls: ['/file-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent {
    @Input() files: File[] = [];
    @Input() filteredFiles: File[] = [];
    @Input() searchRequest: SearchRequest;
    @Input() loadedCount: number;
    @Output() nextPageRequested = new EventEmitter();

    getVisibleCount(): number {
        return this.filteredFiles.length;
    }

    getFilteredCount(): number {
        return this.files.length - this.filteredFiles.length;
    }

    hasMoreResults(): boolean {
        return this.searchRequest.count > this.files.length;
    }

    requestNextPage() {
        this.nextPageRequested.emit();
    }
};