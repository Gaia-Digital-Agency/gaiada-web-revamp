import * as migration_20260401_075817 from './20260401_075817';
import * as migration_20260402_091926 from './20260402_091926';

export const migrations = [
  {
    up: migration_20260401_075817.up,
    down: migration_20260401_075817.down,
    name: '20260401_075817',
  },
  {
    up: migration_20260402_091926.up,
    down: migration_20260402_091926.down,
    name: '20260402_091926'
  },
];
