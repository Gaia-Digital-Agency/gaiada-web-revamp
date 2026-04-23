import * as migration_20260409_053702 from './20260409_053702';
import * as migration_20260409_055049 from './20260409_055049';
import * as migration_20260417_041005 from './20260417_041005';
import * as migration_20260417_041535 from './20260417_041535';
import * as migration_20260421_add_hiring_process from './20260421_add_hiring_process';
import * as migration_20260421_add_missing_blocks from './20260421_add_missing_blocks';
import * as migration_20260423_drop_orphan_services_block from './20260423_drop_orphan_services_block';
import * as migration_20260423_add_post_ordering from './20260423_add_post_ordering';

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
  {
    up: migration_20260417_041005.up,
    down: migration_20260417_041005.down,
    name: '20260417_041005'
  },
  {
    up: migration_20260417_041535.up,
    down: migration_20260417_041535.down,
    name: '20260417_041535'
  },
  {
    up: migration_20260421_add_hiring_process.up,
    down: migration_20260421_add_hiring_process.down,
    name: '20260421_add_hiring_process'
  },
  {
    up: migration_20260421_add_missing_blocks.up,
    down: migration_20260421_add_missing_blocks.down,
    name: '20260421_add_missing_blocks'
  },
  {
    up: migration_20260423_drop_orphan_services_block.up,
    down: migration_20260423_drop_orphan_services_block.down,
    name: '20260423_drop_orphan_services_block'
  },
  {
    up: migration_20260423_add_post_ordering.up,
    down: migration_20260423_add_post_ordering.down,
    name: '20260423_add_post_ordering'
  },
];
