import { Pipe, PipeTransform } from '@angular/core';

import { FileSizeDescriptorType } from '../app.constants';
import { FileSizeDescriptorResolver, MINIMUM_BYTE_VALUE, MAXIMUM_BYTE_VALUE } from '../services/file-size-descriptor.resolver';
import { EnumKeyPipe } from './enum-key.pipe';
import { BytePipe } from './byte.pipe';

// Reference formatted name from this map, else read directly off enum.
const FILE_DESCRIPTOR_NAME_FORMATTED_OVERRIDES = {
    [FileSizeDescriptorType.ExtraLarge]: 'Extra Large'
};

@Pipe({
    name: 'fileSizeDescriptorType'
})
export class FileSizeDescriptorTypePipe implements PipeTransform {

    private enumKeyPipe: EnumKeyPipe;
    private bytePipe: BytePipe;

    constructor(
        private fileSizeDescriptorResolver: FileSizeDescriptorResolver,
    )
    {
        this.enumKeyPipe = new EnumKeyPipe();
        this.bytePipe = new BytePipe();
    }

    transform(value: FileSizeDescriptorType) {
        if (value === FileSizeDescriptorType.All) {
            return 'Any size'
        }
        return `${this.getTypeName(value)} (${this.getTypeDescription(value)})`
    }

    private getTypeName(value: FileSizeDescriptorType): string {
        return FILE_DESCRIPTOR_NAME_FORMATTED_OVERRIDES[value] ||
            this.enumKeyPipe.transform(value, FileSizeDescriptorType);
    }

    private getTypeDescription(value: FileSizeDescriptorType) {
        let fileSizeDescriptor = this.fileSizeDescriptorResolver.find(value);
        let maximumBytesFormatted = this.bytePipe.transform(fileSizeDescriptor.maximumBytes); 
        if (value === FileSizeDescriptorType.Small) {
            return `up to ${maximumBytesFormatted}`;
        }

        let minimumBytesFormatted = this.bytePipe.transform(fileSizeDescriptor.minimumBytes);
        if (value === FileSizeDescriptorType.ExtraLarge) {
            return `more than ${minimumBytesFormatted}`;
        }

        return `${minimumBytesFormatted} - ${maximumBytesFormatted}`;
    }
}