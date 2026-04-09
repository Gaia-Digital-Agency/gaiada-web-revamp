import * as migration_20260409_012255 from './20260409_012255';
import * as migration_20260409_035956_add_scopes_collection from './20260409_035956_add_scopes_collection';

export const migrations = [
  {
    up: migration_20260409_012255.up,
    down: migration_20260409_012255.down,
    name: '20260409_012255',
  },
  {
    up: migration_20260409_035956_add_scopes_collection.up,
    down: migration_20260409_035956_add_scopes_collection.down,
    name: '20260409_035956_add_scopes_collection'
  },
];
