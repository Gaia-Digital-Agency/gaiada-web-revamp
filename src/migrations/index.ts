import * as migration_20260401_075817 from './20260401_075817';
import * as migration_20260402_091926 from './20260402_091926';
import * as migration_20260406_015001 from './20260406_015001';

export const migrations = [
  {
    up: migration_20260401_075817.up,
    down: migration_20260401_075817.down,
    name: '20260401_075817',
  },
  {
    up: migration_20260402_091926.up,
    down: migration_20260402_091926.down,
    name: '20260402_091926',
  },
  {
    up: migration_20260406_015001.up,
    down: migration_20260406_015001.down,
    name: '20260406_015001'
  },
];
