export class contract {
    id: number;
    name: string;
    description: string;
    miner_id: number;
    tags: any;
    status: number;
    version: number;
    data_type: boolean;
    data_format_xlsx: boolean;
    data_format_json: boolean;
    data_format_xml: boolean;
    data_format_csv: boolean;
    data_format_plain_text: boolean;
    startdate: Date;
    enddate: Date;
    username: string;
    password: string;
    passwordConfirm: string;
    location_directory: string;
    location_api_endpoint: string;
    use_primary_wallet: boolean;
    timezone: string;
    currency: string;
    fixed_currency: boolean;
    token_rate: number;
    currency_rate: number;
    contract_limit: number;
    is_private: boolean;
  }
  