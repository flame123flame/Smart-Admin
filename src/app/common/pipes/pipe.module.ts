import { NgModule } from '@angular/core';
import { DecimalFormatPipe } from './decimal-format.pipe';
import { IsEmptyPipe } from './empty.pipe';
import { IsNaNPipe } from './isnan.pipe';
import { DateStringPipe } from './date-string.pipe';
import { DateFormatePipe } from './date-formate.pipe';
import { DateFormateLocal } from './date-formate-local.pipe';
import { DateFormateNot } from './date-formate-not.pipe';
import { DateFormateMonthly } from './date-formate-Monthly.pipe';
import { ArraySortPipe } from './orderby.pipe';


@NgModule({
    imports: [],
    declarations: [
        DecimalFormatPipe,
        IsEmptyPipe,
        IsNaNPipe,
        DateStringPipe,
        DateFormatePipe,
        DateFormateLocal,
        DateFormateNot,
        DateFormateMonthly,
        ArraySortPipe
    ],
    exports: [
        DecimalFormatPipe,
        IsEmptyPipe,
        IsNaNPipe,
        DateStringPipe,
        DateFormatePipe,
        DateFormateLocal,
        DateFormateNot,
        DateFormateMonthly,
        ArraySortPipe
    ],
})
export class PipeModule { }
