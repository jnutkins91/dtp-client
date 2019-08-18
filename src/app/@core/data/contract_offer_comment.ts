import { Observable } from 'rxjs';

export interface contract_offer_comment {
  id: number;
  body: string;
  contract_offer_id: number;
  creation_time: string;
  modification_time: string;
}

export abstract class ContractOfferCommentData {
  abstract getThreads(): Observable<contract_offer_comment[]>;
}