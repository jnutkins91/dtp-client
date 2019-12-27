import { wallet } from './wallet';

export interface dtp_user {
  id: number;
  email: string;
  username: string;
  picture: string;
  bio: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  postal_code: string;
  city: string;
  state_county: string;
  country: string;
  mobile: string;
  wallet_id: string;
  news_pref: boolean;
  deposit_pref: boolean;
  receipt_pref: boolean;
  warnings_pref: boolean;
  comments_pref: boolean;
  newdm_pref: boolean;
  new_contract_pref: boolean;
  wallet: wallet;
}