import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contractStatus' })
export class ContractStatus implements PipeTransform {

    transform(value: number): string {

        if (value == 0)
            return "Draft";
        else if (value == 1)
            return "Active";
        else if (value == 2)
            return "Suspended";
        else
            return "Archived";
    }
}