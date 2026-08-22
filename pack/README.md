# LumenCraft Luminous Dreams Aurora

LumenCraft Luminous Dreams Aurora is an Android-focused Bedrock resource pack with three selectable performance profiles. It combines the dreamy blue/cyan atmosphere with detailed blocks, items, tools, armor, turquoise water, animated caustics, directional rain, rounded sun treatment, original ambient audio, and a High Graphics aurora curtain.

## One-file installation

For the complete installation, open `LumenCraft_LuminousDreams_Aurora.mcaddon` from Android Files or Downloads and choose **Open with → Minecraft**. In the world settings, activate the LumenCraft resource pack and the optional Aurora Companion behavior pack. Choose **High Graphics** if the device remains smooth; choose **Balanced Performance** or **Low Performance** when frame pacing drops.

The resource-only file is `LumenCraft_LuminousDreams_Audio.mcpack`. It includes the selectable visual profiles and custom sound definitions, but it does not automatically run the companion script.

## Visual changes

- `textures/environment/clouds.png` uses layered luminous blue cloud forms with darker depth and cyan-lit undersides.
- `textures/environment/sun_vv.png` uses a centered circular warm sun disc with a soft halo.
- `atmospherics/atmospherics.json` adds blue Rayleigh scattering, restrained Mie scattering, and a softer rounded sun-glare profile.
- `water/water.json` adds clear turquoise water, moderate image-based waves, stronger cyan caustics, and a small biome-water tint contribution.
- `textures/environment/weather.png` uses fine diagonal cyan-white rain streaks for a softer, more directional rain appearance.
- High Graphics adds a sparse animated `lumencraft:aurora_curtain` particle with cyan, violet, and emerald ribbons.
- `color_grading/color_grading.json` adds cool cyan shadows, luminous highlights, and a subtle warm/cool cinematic balance.
- `cubemaps/lumencraft_sky.json` lets the Overworld sky receive atmospheric and volumetric scattering.

## Device profiles

Low reduces texture dimensions, wave octaves, caustics strength, volumetric scattering, and wind-mote rate. Balanced keeps the dreamy water and atmosphere with moderate cost. High enables the strongest cloud, water, caustic, color-grading, and local-lighting response.

## Wind limitation

Bedrock resource packs do not expose one global documented wind-strength switch for all vegetation and weather. This build uses directional rain streaks and the optional companion script to suggest wind. The companion can emit the aurora curtain above Overworld players; Low and Mid profiles safely ignore the effect because the aurora asset is included only in High Graphics.

## Ambient audio

The pack defines two original OGG sounds: `lumencraft.aurora_ambience`, a quiet long-form ambient loop, and `lumencraft.aurora_chime`, a short crystalline wind-and-water accent. The companion starts the ambience at low volume and plays the chime when a sparse aurora burst is emitted.

You can test the sounds manually with:

```text
/playsound lumencraft.aurora_ambience @s
/playsound lumencraft.aurora_chime @s
```

If the sound is too loud, edit the `volume` values in `sounds/sound_definitions.json` and rebuild the resource pack.

## Realistic weather audio

The resource pack also defines `lumencraft.rain_ambience`, a compressed rain-bed recording with close droplets, distant rainfall, puddle detail, and soft directional wind, plus `lumencraft.thunder_roll`, a distant low thunder accent. The matching companion listens for Bedrock weather changes, starts the rain bed with a long cooldown during Rain or Thunder, and plays one conservative thunder accent when Thunder begins.

Use these commands in a test world:

```text
/weather rain
/playsound lumencraft.rain_ambience @s
/weather thunder
/playsound lumencraft.thunder_roll @s
/weather clear
```

The weather audio is intentionally optional and is not played by the resource pack alone. Enable the matching Audio and Aurora Companion behavior pack for automatic rain and thunder playback.

## Falling leaves and wind-blown dust

The companion now emits sparse falling leaves near oak, spruce, birch, jungle, acacia, dark oak, mangrove, cherry, azalea, and flowering azalea foliage. It also emits small luminous sand-gold and cyan dust motes near dry sand, gravel, dirt, podzol, soul sand, clay, and mud. Dust spawning is suppressed while the tracked weather state is Rain or Thunder, so wet weather does not fill the scene with dry dust.

The Low Performance, Balanced Performance, High-Compatible Android, and High Graphics profiles use progressively larger active textures and effect budgets. High-Compatible is capped at a 32px maximum active texture width and uses the Balanced lighting and particle budget, preserving the visual palette and PBR response while avoiding the full High Graphics GPU texture cost. The effects are optional and require the matching companion behavior pack.

## Night, water, and firefly atmosphere

The lighting files use a dreamy day-night curve for warm sunrise/sunset, deep blue night, and a moonlight peak around midnight. The moon’s illuminance is keyframed to create a custom phase-inspired brightness cycle. It changes the moonlight contribution rather than replacing the engine’s visible lunar-disc texture, so the exact disc shape and calendar phase remain controlled by Bedrock.

Water uses profile-specific vertically stacked caustic sheets registered through `textures/textures_list.json`. High uses eight 64px frames, Balanced uses six 48px frames, and Low uses four 32px frames. Underwater fog settings add blue-green volumetric scattering and soft light-ray response; these effects remain dependent on Vibrant Visuals support.

The companion emits `lumencraft:firefly_glow` only during nighttime ticks in forest, swamp, mangrove swamp, jungle, taiga, and related wooded biomes. It checks the player’s current biome through the Bedrock Dimension API and uses a per-player cooldown so fireflies remain sparse rather than becoming a constant particle cloud.

To test the fireflies, enable the companion, use `/time set night`, and visit a supported forest or swamp. To test the water rays, enter a clear body of water with Vibrant Visuals enabled and use the High profile.

For a quick visual test, stand near foliage or dry ground in a clean test world. There is no custom command required; walk near supported blocks and allow the throttled companion scan to emit the particles.

## Android performance profiles

The pack includes four selectable profiles. **Low Performance** is intended for older devices. **Balanced Performance** is the general Android default. **High-Compatible Android** keeps the luminous visual style, PBR response, atmosphere, water, caustics, weather, and particles but caps active texture width at 32px and uses a moderate effect budget. **High Graphics** uses the largest textures and strongest effect settings and should be selected only when Minecraft reports it as compatible.

For a phone that has plenty of system RAM but still reports the High Graphics profile as incompatible, choose **High-Compatible Android**. Bedrock’s compatibility decision is based primarily on the graphics device’s texture and rendering budget, not only on free Android RAM.

## Android test steps

Disable older LumenCraft packs, import this `.mcpack`, activate **LumenCraft Luminous Dreams**, choose one subpack, and test in a new world. Start with Balanced. If your device stutters, use Low; if it remains smooth and cool, try High. Enable Vibrant Visuals if supported by the Bedrock build.

These effects are Bedrock-native Vibrant Visuals settings. Java GLSL, OptiFine, and Iris shader packs are not supported by this resource-pack workflow.
