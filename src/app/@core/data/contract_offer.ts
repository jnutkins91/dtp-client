export class contract_offer {
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
    location_serverURL: string;
    use_primary_wallet: boolean;
    timezone: string;
    currency: string;
    fixed_currency: boolean;
    token_rate: number;
    currency_rate: number;
    is_private: boolean;
    subscriptionType: string;
    files: any;
    test_serverURL: string;
    test_username: string;
    test_password: string;
    test_email: string;
    test_passwordConfirm: string;

    userHasAcceptedContract: boolean;
    checked: boolean;
  }
    