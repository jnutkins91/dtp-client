export interface contract {
    id: number;
    name: string;
    description: string;
    miner_id: number;
    status: number;
    version: number;
    data_format_xlsx: boolean;
    data_format_json: boolean;
    data_format_xml: boolean;
    data_format_csv: boolean;
    data_format_plain_text: boolean;
    username: string;
    location_directory: string;
    location_api_endpoint: string;
    use_primary_wallet: boolean;
    fixed_currency: boolean;
  }