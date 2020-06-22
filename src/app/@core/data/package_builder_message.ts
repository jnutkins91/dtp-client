export interface package_builer_message {
    id: number;
    json: string;
    contract_id: string;
    success: boolean;
    message: string;
    received_at: Date;
    creation_time: Date;
    received_at_string: string;
    creation_time_string: string;
    difference_time_string: string;
  }