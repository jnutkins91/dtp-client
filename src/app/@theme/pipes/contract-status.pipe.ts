import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contractStatus' })
export class ContractStatus implements PipeTransform {

    transform(value: number): string {

        if (value === 0)
            return 'LIVE';
        else if (value === 1)
            return 'SUSPENDED';
        else if (value === 2)
            return 'TERMINATED';
        else
            return 'ERROR';
    }
}
