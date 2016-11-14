import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumKey'
})
export class EnumKeyPipe implements PipeTransform {
    transform(value: any, enumReference: any): string {
        return enumReference[value];
    }
};