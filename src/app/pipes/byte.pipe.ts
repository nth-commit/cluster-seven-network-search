import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'byte'
})
export class BytePipe implements PipeTransform {
    transform(value: number): string {
		let units = ['value', 'kB', 'MB', 'GB', 'TB', 'PB'];
		let number = Math.floor(Math.log(value) / Math.log(1024));
		return (value / Math.pow(1024, Math.floor(number))).toFixed(1) +  ' ' + units[number];
    }
}