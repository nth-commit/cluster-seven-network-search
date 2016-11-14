import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'

import { FileSizeDescriptorType, FileDateDescriptorType } from '../../app.constants';
import { FileFilterPipe } from '../../pipes/file-filter.pipe';
import { File } from '../../services/models/file.model';
import { FileFilterArgs } from '../../pipes/file-filter.pipe';

@Component({
    selector: 'file-list',
    templateUrl: '/file-list.component.html',
    styleUrls: ['/file-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent {
    @Input() files: File[] = [];
    @Input() serverCount: number = Number.MAX_VALUE;
    @Output() nextPageRequested = new EventEmitter();

    FileSizeDescriptorType: any;
    FileDateDescriptorType: any;

    pattern: string;
    sizeDescriptorType: FileSizeDescriptorType = FileSizeDescriptorType.All;
    dateDescriptorType: FileDateDescriptorType = FileDateDescriptorType.All;
    datePropertyName: string;

    constructor(
        private fileFilterPipe: FileFilterPipe
    )
    {
        this.FileSizeDescriptorType = FileSizeDescriptorType;
        this.FileDateDescriptorType = FileDateDescriptorType;
    }

    getFilterArgs(): FileFilterArgs {
        return {
            pattern: this.pattern,
            sizeDescriptorType: this.sizeDescriptorType,
            dateDescriptorType: this.dateDescriptorType,
            datePropertyName: this.datePropertyName
        };
    }

    getVisibleCount(): number {
        return this.fileFilterPipe.transform(this.files, this.getFilterArgs()).length;
    }

    getFilteredCount(): number {
        return this.files.length - this.getVisibleCount();
    }

    hasMoreResults(): boolean {
        return this.serverCount > this.files.length;
    }

    requestNextPage() {
        this.nextPageRequested.emit();
    }
};