# LumenCraft Bedrock Release Notes

This document summarizes the LumenCraft Bedrock resource-pack generations published in the repository. It separates historical prototypes from the later Android-focused builds and explains the differences between resource-only packs, companion behavior packs, and combined installers.

The repository currently contains **66 LumenCraft `.mcpack` and `.mcaddon` archives** in [`releases/`](./releases/). Every archive was added in its own commit. The inventory confirmed that all 66 archives are ZIP-valid and that every `.mcpack` contains a root-level `manifest.json`. Poggy'sLum is not part of this release archive.

## Current recommendation

For the newest all-in-one experience, use [`LumenCraft_FINAL_Complete.mcaddon`](./releases/LumenCraft_FINAL_Complete.mcaddon). It contains the final sky-and-cloud revision, underwater sunbeams, reflective water tuning, bioluminescent particles, floating dust motes, custom underwater audio, PBR materials, lighting repairs, and the companion behavior pack.

For a resource-only installation, use [`LumenCraft_FINAL_Direct_Import.mcpack`](./releases/LumenCraft_FINAL_Direct_Import.mcpack). Its manifest is directly at the archive root and it is the safest file to test when Android has previously opened a stale or incorrectly renamed archive. Automatic scripted particle and audio playback requires the companion or the combined `.mcaddon`.

For a lighter Android choice, use [`LumenCraft_Android_High_Compatible_Complete.mcaddon`](./releases/LumenCraft_Android_High_Compatible_Complete.mcaddon). It preserves the high-style direction with a reduced texture budget. The unrestricted and maximum-quality editions can exceed a device's GPU rendering budget even when the phone has substantial free system memory.

## Release progression

| Release family | Representative files | Main difference |
|---|---|---|
| PBR starter and direct-import prototypes | `LumenCraft_PBR_Starter.mcpack`, `LumenCraft_Direct_Import.mcpack`, `LumenCraft_Complete.mcaddon` | Initial PBR material structure and a small companion particle demonstration. These are historical proof-of-concept packages, not the complete LumenCraft experience. |
| Block and item quality expansion | `LumenCraft_Full_HD.mcpack`, `LumenCraft_HighGraphics.mcpack` | Expanded high-resolution block, item, tool, and armor visuals. `HighGraphics` focuses especially on items and armor. |
| First Luminous Dreams release | `LumenCraft_LuminousDreams.mcpack`, `LumenCraft_LuminousDreams_Companion.mcpack`, `LumenCraft_LuminousDreams.mcaddon` | Introduced the Luminous Dreams visual direction, PBR materials, atmosphere, lighting, and the first companion behavior effects. |
| Aurora and audio | `LumenCraft_LuminousDreams_Aurora.mcaddon`, `LumenCraft_LuminousDreams_Aurora_Companion.mcpack`, `LumenCraft_LuminousDreams_Audio.mcpack`, `LumenCraft_LuminousDreams_Audio_Aurora.mcaddon` | Added aurora-oriented sky effects, ambient audio, and a separate audio/aurora companion. These builds are superseded by the later underwater-audio and final builds. |
| Weather and natural effects | `LumenCraft_LuminousDreams_Weather_Audio.mcpack`, `LumenCraft_LuminousDreams_Weather_Audio.mcaddon`, `LumenCraft_LuminousDreams_Weather_Particles.mcpack`, `LumenCraft_LuminousDreams_Weather_Particles.mcaddon` | Added rain and thunder audio, weather responses, falling leaves, wind-blown dust, and related scripted effects. |
| Night, water, and fireflies | `LumenCraft_LuminousDreams_Night_Water_Firefly.mcpack`, `LumenCraft_LuminousDreams_Night_Water_Firefly.mcaddon`, `LumenCraft_LuminousDreams_Night_Water_Firefly_Companion.mcpack` | Combined night lighting, water treatment, firefly particles, and the companion behavior layer. |
| Selectable Android profiles | `LumenCraft_Selectable.mcpack`, `LumenCraft_ErrorFixed.mcpack` | Introduced manually selectable performance profiles and subsequent manifest/error repairs. `ErrorFixed` is a historical repair build and retains older manifest value types; prefer the later strict Android builds. |
| Strict Android packaging | `LumenCraft_Android_Strict_Visuals.mcpack`, `LumenCraft_Android_Strict_Companion.mcpack`, `LumenCraft_Android_Strict_Complete.mcaddon` | Reworked manifests for Android import reliability with numeric version arrays, strict roots, and matching resource/behavior dependencies. |
| High-Compatible Android profile | `LumenCraft_Android_High_Compatible.mcpack`, `LumenCraft_Android_High_Compatible_Companion.mcpack`, `LumenCraft_Android_High_Compatible_Complete.mcaddon` | Added a lower-budget Android profile derived from the mid-range visual set, with active texture widths capped at approximately 32 px to reduce memory and GPU pressure while retaining the visual style. |
| Clean Realism repair | `LumenCraft_Clean_Realism_Android.mcpack`, `LumenCraft_Clean_Realism_Companion.mcpack`, `LumenCraft_Clean_Realism_Android_Complete.mcaddon`, `LumenCraft_Direct_Visual_Fixed.mcpack` | Removed faulty custom rain/environment overrides, calmed water caustics, rebuilt the sun as a compact round disc with transparency, reduced aggressive glare, and corrected lighting behavior. |
| Unrestricted maximum quality | `LumenCraft_Unrestricted_Maximum_Quality.mcpack`, `LumenCraft_Unrestricted_Maximum_Quality_Companion.mcpack`, `LumenCraft_Unrestricted_Maximum_Quality_Complete.mcaddon` | Flattened the full High Graphics profile into a standalone pack with no `subpacks` entry and no `memory_performance_tier` selection lock. This removes Bedrock's automatic profile gate but cannot remove real GPU limits. |
| Reflective Spectral | `LumenCraft_Reflective_Spectral_Maximum_Quality.mcpack`, `LumenCraft_Reflective_Spectral_Maximum_Quality_Companion.mcpack`, `LumenCraft_Reflective_Spectral_Maximum_Quality_Complete.mcaddon` | Refreshed base block materials across the high-quality texture set and strengthened supported water reflection response using PBR roughness, waves, caustics, and water settings. |
| Underwater Spectral and sunbeams | `LumenCraft_Underwater_Spectral_Maximum_Quality.*`, `LumenCraft_Underwater_Sunbeams_Maximum_Quality.*` | Shifted the visual focus underwater with blue-teal scattering, clearer visibility, brighter animated caustics, and diagonal underwater sunbeam shafts using supported fog, atmosphere, and forward-scattering controls. |
| Bioluminescent and reflective underwater | `LumenCraft_Underwater_Bioluminescent_Reflective_Maximum_Quality.*`, `LumenCraft_Underwater_Bioluminescent_Reflective_LightingFixed.*` | Added original glowing underwater particles, floating dust motes, stronger reflective-water tuning, and a lighting-schema repair after Bedrock rejected the earlier lighting structure. |
| Underwater audio and manifest repair | `LumenCraft_Underwater_Bioluminescent_Reflective_Audio_Maximum_Quality.*`, `LumenCraft_Underwater_Audio_Direct_Import_ManifestFixed.mcpack`, `LumenCraft_Underwater_Audio_Complete_ManifestFixed.mcaddon` | Added original underwater ambience and bioluminescent chimes, then repackaged the direct resource file with an unmistakable root manifest after Android repeatedly opened stale or renamed archives. |
| Sky and cloud reference revision | `LumenCraft_Sky_Cloud_Reference_Maximum_Quality.mcpack`, `LumenCraft_Sky_Cloud_Reference_Maximum_Quality_Companion.mcpack`, `LumenCraft_Sky_Cloud_Reference_Maximum_Quality_Complete.mcaddon` | Replaced the washed-out daytime response with a deeper blue sky, softer layered clouds, controlled sun glow, reduced white haze, and preserved underwater/audio features. |
| Final cache-busting release | `LumenCraft_FINAL_Direct_Import.mcpack`, `LumenCraft_FINAL_Companion.mcpack`, `LumenCraft_FINAL_Complete.mcaddon` | Final consolidated build at resource version `[5, 13, 1]` with fresh UUIDs, current sky/cloud treatment, underwater effects, particles, audio, lighting fixes, PBR, and a direct-import resource archive. |

## Installer types

| Extension | Contents | Correct use |
|---|---|---|
| `.mcpack` resource file | One resource pack with a root `manifest.json` | Open directly with Minecraft and activate under World Settings → Resource Packs. |
| `.mcpack` companion file | One behavior/script pack with its own root `manifest.json` | Import separately and activate under World Settings → Behavior Packs when automatic effects are desired. |
| `.mcaddon` combined file | A bundle containing a resource `.mcpack` and a behavior `.mcpack` | Open as `.mcaddon` with Minecraft. Do not rename it to `.mcpack`. |

## Compatibility and supersession notes

Several early releases were made while the pack was being repaired incrementally. Their archives remain in the repository for history and comparison, but they should not be preferred for new installations. In particular, early builds may use string-form manifest versions, older dependency UUIDs, aggressive weather textures, or settings UI controls that were not stable across Bedrock versions.

The latest final build uses `format_version: 2`, numeric version arrays, fresh UUIDs, a root resource manifest, and `min_engine_version: [1, 21, 120]`. The current final pack also avoids the old settings-screen injection that caused undefined RTX and dynamic-texture UI control errors. Bedrock’s final reflection and volumetric-light appearance remains device-dependent; a resource pack can tune PBR roughness, water, fog, caustics, and atmosphere, but it cannot guarantee a literal mirror surface or unrestricted GPU performance on every Android device.

## Installation rules

Always download the actual archive from the repository release directory rather than saving a webpage or renaming a downloaded file. Delete older copies from Android Downloads and Minecraft Storage before testing a new build. If Minecraft displays `Unknown Pack Description`, Pack ID all zeros, version `0.0.0`, or `Unable to find manifest`, it is reading a stale, renamed, nested, or otherwise malformed archive rather than the intended direct resource pack.

For a new Android test, begin with `LumenCraft_FINAL_Direct_Import.mcpack`. Once it imports correctly, use `LumenCraft_FINAL_Complete.mcaddon` when you want automatic underwater particles, dust motes, ambient audio, and companion effects. Test the unrestricted or maximum-quality editions only after confirming that the device can render the final pack without severe stutter, overheating, visual fallback, or crashes.

## Source and verification

The release inventory used for this summary is stored as `lumencraft_release_inventory.json` in the workspace. It records archive sizes, member counts, manifest metadata, nested pack structure, and the published commit chronology. The public repository is [theneotic/lumencraft-bedrock](https://github.com/theneotic/lumencraft-bedrock), with the published archives in [`releases/`](https://github.com/theneotic/lumencraft-bedrock/tree/main/releases).

This document describes static project artifacts and does not claim that every historical build was runtime-tested on an Android Bedrock client. Device-side testing remains necessary for Vibrant Visuals, water reflections, UI integration, audio playback, and Script API behavior.

## References

[1]: https://learn.microsoft.com/en-us/minecraft/creator/documents/resourcepack?view=minecraft-bedrock-stable — Microsoft Learn, “Resource Packs.”

[2]: https://learn.microsoft.com/en-us/minecraft/creator/documents/vibrantvisuals/lightingcustomization?view=minecraft-bedrock-stable — Microsoft Learn, “Light Sources” and Vibrant Visuals lighting schemas.

[3]: https://learn.microsoft.com/en-us/minecraft/creator/documents/vibrantvisuals/watercustomization?view=minecraft-bedrock-stable — Microsoft Learn, Vibrant Visuals water customization.
