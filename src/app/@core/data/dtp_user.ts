export interface dtp_user {
  id: number;
  email: string;
  username: string;
  picture: string;
  mobile: string;
  wallet_id: string;
  news_pref: boolean;
  deposit_pref: boolean;
  receipt_pref: boolean;
  warnings_pref: boolean;
  comments_pref: boolean;
  newdm_pref: boolean;
  new_contract_pref: boolean;
}