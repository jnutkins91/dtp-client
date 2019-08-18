import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contractStatusColor' })
export class ContractStatusColor implements PipeTransform {

    transform(value: number): string {

        if (value == 0)
            return "info";
        else if (value == 1)
            return "success";
        else if (value == 2)
            return "danger";
        else
            return "warning";
    }
}