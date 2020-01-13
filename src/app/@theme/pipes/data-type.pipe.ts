import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dataType' })
export class DataType implements PipeTransform {

    transform(value: boolean): string {

        if (value === true)
            return 'PROCESSED';
        else
            return 'RAW';
    }
}