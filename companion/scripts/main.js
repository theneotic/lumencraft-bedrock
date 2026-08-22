import { system, world } from '@minecraft/server';

const EFFECTS = {
  ember: 'lumencraft:ember_sparks',
  dust: 'lumencraft:magic_dust',
  wind: 'lumencraft:wind_motes',
  aurora: 'lumencraft:aurora_curtain',
  leaf: 'lumencraft:falling_leaf',
  windDust: 'lumencraft:wind_dust',
  firefly: 'lumencraft:firefly_glow',
};
const SOUNDS = {
  ambience: 'lumencraft.aurora_ambience',
  chime: 'lumencraft.aurora_chime',
  rain: 'lumencraft.rain_ambience',
  thunder: 'lumencraft.thunder_roll',
};

const TORCH_BLOCKS = new Set([
  'minecraft:torch',
  'minecraft:wall_torch',
  'minecraft:lantern',
  'minecraft:soul_torch',
  'minecraft:soul_wall_torch',
  'minecraft:soul_lantern',
]);

const AMETHYST_BLOCKS = new Set([
  'minecraft:amethyst_block',
  'minecraft:budding_amethyst',
  'minecraft:amethyst_cluster',
  'minecraft:large_amethyst_bud',
  'minecraft:medium_amethyst_bud',
  'minecraft:small_amethyst_bud',
]);
const LEAF_BLOCKS = new Set([
  'minecraft:oak_leaves',
  'minecraft:spruce_leaves',
  'minecraft:birch_leaves',
  'minecraft:jungle_leaves',
  'minecraft:acacia_leaves',
  'minecraft:dark_oak_leaves',
  'minecraft:mangrove_leaves',
  'minecraft:cherry_leaves',
  'minecraft:azalea_leaves',
  'minecraft:flowering_azalea_leaves',
]);
const DUST_BLOCKS = new Set([
  'minecraft:sand',
  'minecraft:red_sand',
  'minecraft:gravel',
  'minecraft:coarse_dirt',
  'minecraft:dirt',
  'minecraft:podzol',
  'minecraft:soul_sand',
  'minecraft:soul_soil',
  'minecraft:clay',
  'minecraft:mud',
]);
const FIREFLY_BIOMES = new Set([
  'minecraft:swamp',
  'minecraft:mangrove_swamp',
  'minecraft:forest',
  'minecraft:flower_forest',
  'minecraft:birch_forest',
  'minecraft:old_growth_birch_forest',
  'minecraft:dark_forest',
  'minecraft:taiga',
  'minecraft:old_growth_pine_taiga',
  'minecraft:old_growth_spruce_taiga',
  'minecraft:jungle',
  'minecraft:sparse_jungle',
]);

const SCAN_RADIUS = 5;
const SCAN_VERTICAL_RADIUS = 2;
const EMIT_INTERVAL_TICKS = 20;
const WIND_INTERVAL_TICKS = 20;
const AMBIENT_INTERVAL_TICKS = 2200;
const FIREFLY_INTERVAL_TICKS = 40;
const SCAN_INTERVAL_TICKS = 10;
const lastEmitted = new Map();
const lastSounds = new Map();
const weatherByDimension = new Map();

function keyFor(dimensionId, x, y, z, effect) {
  return `${dimensionId}:${x},${y},${z}:${effect}`;
}

function shouldEmit(key, tick, interval = EMIT_INTERVAL_TICKS) {
  const previous = lastEmitted.get(key) ?? -interval;
  if (tick - previous < interval) {
    return false;
  }
  lastEmitted.set(key, tick);
  return true;
}

function randomOffset(scale) {
  return (Math.random() - 0.5) * scale;
}

function emitBlockParticle(player, block, effect, tick) {
  const location = block.location;
  const key = keyFor(player.dimension.id, location.x, location.y, location.z, effect);
  if (!shouldEmit(key, tick)) {
    return;
  }
  const spawnLocation = {
    x: location.x + 0.5 + randomOffset(0.25),
    y: location.y + 0.65 + Math.random() * 0.35,
    z: location.z + 0.5 + randomOffset(0.25),
  };
  try {
    player.dimension.spawnParticle(effect, spawnLocation);
  } catch {
    // A block can unload between the scan and the particle call.
  }
}

function normalizedDimensionId(value) {
  return value.startsWith('minecraft:') ? value : `minecraft:${value}`;
}

function playAmbientSound(player, tick) {
  if (player.dimension.id !== 'minecraft:overworld') {
    return;
  }
  const key = `${player.dimension.id}:ambient_audio`;
  const previous = lastSounds.get(key) ?? -AMBIENT_INTERVAL_TICKS;
  if (tick - previous < AMBIENT_INTERVAL_TICKS) {
    return;
  }
  lastSounds.set(key, tick);
  try {
    player.dimension.playSound(SOUNDS.ambience, player.location, { volume: 0.34, pitch: 1.0 });
  } catch {
    // Audio is optional; the visual pack remains usable if sound playback is unavailable.
  }
}

function playWeatherAudio(player, tick) {
  const weather = weatherByDimension.get(player.dimension.id) ?? 'Clear';
  if (weather !== 'Rain' && weather !== 'Thunder') {
    return;
  }
  const key = `${player.dimension.id}:rain_audio`;
  const previous = lastSounds.get(key) ?? -2600;
  if (tick - previous >= 1900) {
    lastSounds.set(key, tick);
    try {
      player.dimension.playSound(SOUNDS.rain, player.location, { volume: 0.30, pitch: 1.0 });
    } catch {
      // Weather audio is optional and must not stop the rest of the companion.
    }
  }
}

function emitFireflies(player, tick) {
  if (player.dimension.id !== 'minecraft:overworld') {
    return;
  }
  const time = world.getTimeOfDay();
  if (time < 13000 || time >= 23000 || Math.random() > 0.28) {
    return;
  }
  const sample = {
    x: Math.floor(player.location.x),
    y: Math.floor(player.location.y),
    z: Math.floor(player.location.z),
  };
  let biomeId;
  try {
    const biome = player.dimension.getBiome(sample);
    biomeId = biome.id ?? String(biome);
  } catch {
    return;
  }
  if (!FIREFLY_BIOMES.has(biomeId)) {
    return;
  }
  const key = `${player.id}:fireflies`;
  const previous = lastSounds.get(key) ?? -FIREFLY_INTERVAL_TICKS;
  if (tick - previous < FIREFLY_INTERVAL_TICKS) {
    return;
  }
  lastSounds.set(key, tick);
  const spawnLocation = {
    x: player.location.x + randomOffset(3.5),
    y: player.location.y + 0.5 + Math.random() * 2.2,
    z: player.location.z + randomOffset(3.5),
  };
  try {
    player.dimension.spawnParticle(EFFECTS.firefly, spawnLocation);
  } catch {
    // Fireflies are optional and must not stop the companion.
  }
}

function emitAurora(player, tick) {
  // The aurora is intentionally rare and high above the player to keep it atmospheric.
  if (player.dimension.id !== 'minecraft:overworld') {
    return;
  }
  const location = player.location;
  const key = `${player.dimension.id}:aurora:${Math.floor(location.x / 16)},${Math.floor(location.z / 16)}`;
  if (!shouldEmit(key, system.currentTick, 100) || Math.random() > 0.12) {
    return;
  }
  const spawnLocation = {
    x: location.x + randomOffset(18.0),
    y: Math.max(location.y + 28.0, 80.0),
    z: location.z + randomOffset(18.0),
  };
  try {
    player.dimension.spawnParticle(EFFECTS.aurora, spawnLocation);
    player.dimension.playSound(SOUNDS.chime, spawnLocation, { volume: 0.26, pitch: 0.94 + Math.random() * 0.12 });
  } catch {
    // The aurora is optional and only exists in the High Graphics resource subpack.
  }
}

function emitWindMotes(player, tick) {
  // Keep this lightweight: at most one ambient burst per player every second.
  const location = player.location;
  const key = `${player.dimension.id}:wind:${Math.floor(location.x / 4)},${Math.floor(location.y / 4)},${Math.floor(location.z / 4)}`;
  if (!shouldEmit(key, tick, WIND_INTERVAL_TICKS) || Math.random() > 0.30) {
    return;
  }
  const spawnLocation = {
    x: location.x + randomOffset(5.0),
    y: location.y + 1.2 + Math.random() * 2.0,
    z: location.z + randomOffset(5.0),
  };
  try {
    player.dimension.spawnParticle(EFFECTS.wind, spawnLocation);
  } catch {
    // The optional wind effect is harmless if the active resource pack is older.
  }
}

function scanAroundPlayer(player, tick) {
  const origin = {
    x: Math.floor(player.location.x),
    y: Math.floor(player.location.y),
    z: Math.floor(player.location.z),
  };
  for (let x = -SCAN_RADIUS; x <= SCAN_RADIUS; x += 1) {
    for (let y = -SCAN_VERTICAL_RADIUS; y <= SCAN_VERTICAL_RADIUS; y += 1) {
      for (let z = -SCAN_RADIUS; z <= SCAN_RADIUS; z += 1) {
        let block;
        try {
          block = player.dimension.getBlock({
            x: origin.x + x,
            y: origin.y + y,
            z: origin.z + z,
          });
        } catch {
          continue;
        }
        if (!block) {
          continue;
        }
        if (TORCH_BLOCKS.has(block.typeId)) {
          emitBlockParticle(player, block, EFFECTS.ember, tick);
        } else if (AMETHYST_BLOCKS.has(block.typeId)) {
          emitBlockParticle(player, block, EFFECTS.dust, tick);
        } else if (LEAF_BLOCKS.has(block.typeId) && Math.random() < 0.018) {
          // Sparse leaf fall near foliage; the particle supplies the wind-blown motion.
          emitBlockParticle(player, block, EFFECTS.leaf, tick);
        } else if (DUST_BLOCKS.has(block.typeId) && weatherByDimension.get(player.dimension.id) === 'Clear' && Math.random() < 0.010) {
          // Dry ground only: rain suppresses dust naturally.
          emitBlockParticle(player, block, EFFECTS.windDust, tick);
        }
      }
    }
  }
  emitWindMotes(player, tick);
  emitFireflies(player, tick);
  emitAurora(player, tick);
  playAmbientSound(player, tick);
  playWeatherAudio(player, tick);
}

function pruneCooldowns(tick) {
  for (const [key, lastTick] of lastEmitted) {
    if (tick - lastTick > 200) {
      lastEmitted.delete(key);
    }
  }
}

world.afterEvents.weatherChange.subscribe((event) => {
  const dimensionId = normalizedDimensionId(event.dimension);
  weatherByDimension.set(dimensionId, event.newWeather);
  if (event.newWeather !== 'Thunder') {
    return;
  }
  const player = world.getAllPlayers().find((candidate) => candidate.dimension.id === dimensionId);
  if (!player) {
    return;
  }
  const key = `${dimensionId}:thunder_event`;
  const previous = lastSounds.get(key) ?? -3600;
  if (system.currentTick - previous < 3600) {
    return;
  }
  lastSounds.set(key, system.currentTick);
  try {
    player.dimension.playSound(SOUNDS.thunder, player.location, { volume: 0.40, pitch: 0.92 + Math.random() * 0.12 });
  } catch {
    // Thunder audio is optional and must not stop the weather companion.
  }
});

system.runInterval(() => {
  const tick = system.currentTick;
  for (const player of world.getAllPlayers()) {
    scanAroundPlayer(player, tick);
  }
  pruneCooldowns(tick);
}, SCAN_INTERVAL_TICKS);
