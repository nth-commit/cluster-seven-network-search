import { Injectable } from '@angular/core';

import { EnumValuesPipe } from '../pipes/enum-values.pipe';
import { FileSizeDescriptorType, MAX_FILE_SIZES } from '../app.constants';
import { FileSizeDescriptor } from './models/file-size-descriptor.model';
import { File } from './models/file.model';

export const MINIMUM_BYTE_VALUE = 0;
export const MAXIMUM_BYTE_VALUE = Number.MAX_VALUE;

@Injectable()
export class FileSizeDescriptorResolver {

    private enumValuesPipe: EnumValuesPipe;

    constructor() {
        this.enumValuesPipe = new EnumValuesPipe();
    }

    resolve(file: File): FileSizeDescriptor {
        return this.list()
            .filter(f => f.type !== FileSizeDescriptorType.All)
            .filter(f => f.minimumBytes < file.size && file.size < f.maximumBytes)[0];
    }
    
    list(): FileSizeDescriptor[] {
        return this.enumValuesPipe
            .transform(FileSizeDescriptorType)
            .map(i => this.find(i));
    }

    find(type: FileSizeDescriptorType): FileSizeDescriptor {
        return {
            type,
            minimumBytes: this.getMinimumBytes(type),
            maximumBytes: this.getMaximumBytes(type)
        };
    }

    private getMinimumBytes(type: FileSizeDescriptorType): number {
        let previousType = type - 1 
        return previousType <= FileSizeDescriptorType.All ? MINIMUM_BYTE_VALUE : MAX_FILE_SIZES[previousType];
    }

    private getMaximumBytes(type: FileSizeDescriptorType): number {
        return MAX_FILE_SIZES[type] || MAXIMUM_BYTE_VALUE
    }
}