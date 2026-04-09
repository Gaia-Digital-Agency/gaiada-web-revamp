import * as migration_20260409_053702 from './20260409_053702';
import * as migration_20260409_055049 from './20260409_055049';

export const migrations = [
  {
    up: migration_20260409_053702.up,
    down: migration_20260409_053702.down,
    name: '20260409_053702',
  },
  {
    up: migration_20260409_055049.up,
    down: migration_20260409_055049.down,
    name: '20260409_055049'
  },
];
