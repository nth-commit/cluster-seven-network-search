import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { Moment, DurationInputArg2 } from 'moment';

import { FileSizeDescriptorType, FileDateDescriptorType } from '../app.constants';
import { FileSizeDescriptorResolver } from './../services/file-size-descriptor.resolver';
import { File } from './../services/models/file.model';
import { FileSizeDescriptor } from './../services/models/file-size-descriptor.model';

export interface FileFilterArgs {
    pattern: string;

    sizeDescriptorType: FileSizeDescriptorType;

    dateDescriptorType: FileDateDescriptorType;

    datePropertyName: string;
};

const DEFAULT_FILE_FILTER_ARGS: FileFilterArgs = {
    pattern: '',

    sizeDescriptorType: FileSizeDescriptorType.All,

    dateDescriptorType: FileDateDescriptorType.All,

    datePropertyName: ''
};

@Pipe({
    name: 'fileFilter'
})
export class FileFilterPipe implements PipeTransform {

    constructor(
        private fileSizeDescriptorResolver: FileSizeDescriptorResolver
    ) { }

    transform(value: File[] = [], filterArgs: FileFilterArgs = DEFAULT_FILE_FILTER_ARGS): File[] {
        filterArgs = Object.assign({}, DEFAULT_FILE_FILTER_ARGS, filterArgs);

        return value.filter(f => 
            this.isPatternMatch(f, filterArgs) &&
            this.isSizeMatch(f, filterArgs) &&
            this.isDateMatch(f, filterArgs));
    }

    private isPatternMatch(file: File, filterArgs: FileFilterArgs): boolean {
        return !filterArgs.pattern || file.path.indexOf(filterArgs.pattern) > 0;
    }

    private isSizeMatch(file: File, filterArgs: FileFilterArgs): boolean {
        if (filterArgs.sizeDescriptorType === FileSizeDescriptorType.All) {
            return true;
        }
        let fileSizeDescriptor = this.fileSizeDescriptorResolver.resolve(file);
        return fileSizeDescriptor.type === filterArgs.sizeDescriptorType;
    }

    private isDateMatch(file: File, filterArgs: FileFilterArgs): boolean {
        let type = filterArgs.dateDescriptorType; 
        if (type === FileDateDescriptorType.All) {
            return true;
        }

        let momentUnits: DurationInputArg2 = null;
        if (type === FileDateDescriptorType.PastHour) {
            momentUnits = 'hours';
        } else if (type === FileDateDescriptorType.PastDay) {
            momentUnits = 'days';
        } else if (type === FileDateDescriptorType.PastWeek) {
            momentUnits = 'weeks';
        } else if (type === FileDateDescriptorType.PastMonth) {
            momentUnits = 'months';
        } else if (type === FileDateDescriptorType.PastYear) {
            momentUnits = 'years';
        } else {
            throw 'Unrecognised FileDateDescriptorType';
        }

        let createdTimestamp: Moment = moment(file.created);
        let earliestCreatedTimestamp: Moment = moment().add(-1, momentUnits);
        return createdTimestamp.diff(earliestCreatedTimestamp) > 0;
    }
};

