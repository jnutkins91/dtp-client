import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    contractName: 'All Match Data',
    minerProcessor: 'Pinnacle62',
    tournament: '2019 Blast Pro Sau Paulo',
    feedFrequency: '25 Seconds',
    startDate: '21/04/2019',
  },
  {
    id: 2,
    contractName: 'Semi-Final Match Data',
    minerProcessor: 'D3lta1',
    tournament: 'The International 2019',
    feedFrequency: '15 Seconds',
    startDate: '12/05/2019',
  },
  {
    id: 3,
    contractName: 'Team Data - KEEN GAMING (DOTA 2)',
    minerProcessor: 'D3lta1',
    tournament: 'N/A',
    feedFrequency: '1 Minute',
    startDate: '28/04/2019',
  },
  {
    id: 4,
    contractName: 'Team Data - Virtus.Pro (DOTA 2)',
    minerProcessor: 'D3lta1',
    tournament: 'N/A',
    feedFrequency: '1 Minute',
    startDate: '28/04/2019',
  },
  {
    id: 5,
    contractName: 'Player Data - FalleN (CS:GO)',
    minerProcessor: 'H0nor',
    tournament: 'N/A',
    feedFrequency: '15 Minutes',
    startDate: '30/04/2019',
  },
  {
    id: 6,
    contractName: 'Player Data - shox (CS:GO)',
    minerProcessor: 'H0nor',
    tournament: 'N/A',
    feedFrequency: '15 Minutes',
    startDate: '30/04/2019',
  },
  {
    id: 7,
    contractName: 'Player Data - Thresh (LoL)',
    minerProcessor: 'Min3r',
    tournament: 'Grand Tournament',
    feedFrequency: '5 Seconds',
    startDate: '30/04/2019',
  },
  {
    id: 8,
    contractName: 'Player Data - Morgana (LoL)',
    minerProcessor: 'Min3r',
    tournament: 'Grand Tournament',
    feedFrequency: '5 Seconds',
    startDate: '30/04/2019',
  },
  {
    id: 9,
    contractName: 'All Match Data',
    minerProcessor: 'Min3r',
    tournament: 'Grand Tournament',
    feedFrequency: '5 Seconds',
    startDate: '30/04/2019',
  },
  {
    id: 10,
    contractName: 'All Match Data',
    minerProcessor: 'H0nor',
    tournament: 'The International 2019',
    feedFrequency: '5 Seconds',
    startDate: '30/04/2019',
  },
  {
    id: 11,
    contractName: 'All Match Data',
    minerProcessor: 'G00dM1n3r',
    tournament: 'FIFA 2019',
    feedFrequency: '5 Seconds',
    startDate: '30/04/2019',
  }];

  getData() {
    return this.data;
  }
}
