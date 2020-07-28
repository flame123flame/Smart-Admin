import { Pipe, PipeTransform } from '@angular/core';
import { EnDateToThDate, digit, ThDateToEnDate } from '../helper';
import * as moment from 'moment';

@Pipe({
    name: 'dateString',
    pure: false
})
export class DateFormateLocal implements PipeTransform {
    transform(value: Date, time: boolean = true): any {
        if (time) {
            const timeStr: string = digit((new Date(value)).getHours()) + ":" + digit((new Date(value)).getMinutes()) + " น.";
            const dateStr: string = ThDateToEnDate(moment(new Date(value), "DD/MM/YYYY").format("DD/MM/YYYY").toString());
            return dateStr + " " + timeStr;
        }
        return ThDateToEnDate(moment(new Date(value), "DD/MM/YYYY").format("DD/MM/YYYY").toString());
    }
}