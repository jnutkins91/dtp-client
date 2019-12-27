import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contractStatus' })
export class ContractStatus implements PipeTransform {

    transform(value: number): string {

        if (value == 0)
            return "DRAFT";
        else if (value == 1)
            return "ACTIVE";
        else if (value == 2)
            return "SUSPENDED";
        else
            return "ARCHIVED";
    }
}