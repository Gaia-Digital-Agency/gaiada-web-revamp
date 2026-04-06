import * as migration_20260401_075817 from './20260401_075817';
import * as migration_20260402_094657 from './20260402_094657';
import * as migration_20260403_020503 from './20260403_020503';
import * as migration_20260402_091926 from './20260402_091926';
import * as migration_20260406_015001 from './20260406_015001';
import * as migration_20260406_040114 from './20260406_040114';

export const migrations = [
  {
    up: migration_20260401_075817.up,
    down: migration_20260401_075817.down,
    name: '20260401_075817',
  },
  {
    up: migration_20260402_094657.up,
    down: migration_20260402_094657.down,
    name: '20260402_094657',
  },
  {
    up: migration_20260403_020503.up,
    down: migration_20260403_020503.down,
    name: '20260403_020503'
    up: migration_20260402_091926.up,
    down: migration_20260402_091926.down,
    name: '20260402_091926',
  },
  {
    up: migration_20260406_015001.up,
    down: migration_20260406_015001.down,
    name: '20260406_015001',
  },
  {
    up: migration_20260406_040114.up,
    down: migration_20260406_040114.down,
    name: '20260406_040114'
  },
];
