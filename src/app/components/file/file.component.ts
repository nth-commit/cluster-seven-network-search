import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

import { File } from '../../services/models/file.model';

const DOMAIN_SPLIT_CHAR = '\\';

@Component({
    selector: 'file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent {
    @Input() file: File;

    getFileName(): string {
        return this.file.path.split(DOMAIN_SPLIT_CHAR).pop();
    }

    getNetworkDirectory(): string {
        let domainParts = this.file.path.split(DOMAIN_SPLIT_CHAR);
        domainParts.pop();
        return domainParts
            .map(s => s + DOMAIN_SPLIT_CHAR)
            .join('');
    }
};