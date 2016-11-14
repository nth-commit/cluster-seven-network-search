import { Pipe, PipeTransform } from '@angular/core';

import { FileDateDescriptorType } from '../app.constants';

@Pipe({
    name: 'fileDateDescriptorType'
})
export class FileDateDescriptorTypePipe implements PipeTransform {

    transform(value: FileDateDescriptorType) {
        switch (value) {
            case FileDateDescriptorType.All:
                return "Any time";
            case FileDateDescriptorType.PastHour:
                return "Past hour";
            case FileDateDescriptorType.PastDay:
                return "Past day";
            case FileDateDescriptorType.PastWeek:
                return "Past week";
            case FileDateDescriptorType.PastMonth:
                return "Past month";
            case FileDateDescriptorType.PastYear:
                return "Past year";
            default:
                return "Unknown";
        }
    }
}