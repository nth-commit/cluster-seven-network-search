import { FileSizeDescriptorType } from '../../app.constants';

export interface FileSizeDescriptor {
    minimumBytes: number;

    maximumBytes: number;

    type: FileSizeDescriptorType;
};