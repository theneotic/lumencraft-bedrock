# LumenCraft Bedrock — Android High-Compatible

LumenCraft is an original Minecraft Bedrock resource-pack project with selectable Android performance profiles, PBR materials, luminous atmosphere, water caustics, weather, custom audio, particles, aurora effects, and a companion Script API behavior pack.

## Recommended Android installer

Open `installers/LumenCraft_Android_High_Compatible_Complete.mcaddon` with Minecraft. Activate the LumenCraft resource pack and its companion behavior pack in a new world, then choose **High-Compatible Android** in the resource-pack subpack settings.

The High-Compatible profile preserves the luminous visual style while capping active texture width at 32px and using moderate lighting, caustic, and particle budgets. It is intended for devices that have sufficient system RAM but are rejected by Bedrock’s full High Graphics GPU budget.

## Repository layout

- `pack/` — complete Bedrock resource pack with Low Performance, Balanced Performance, High-Compatible Android, and High Graphics subpacks.
- `companion/` — optional Script API behavior pack for weather, audio, aurora, leaves, dust, wind motes, and nighttime fireflies.
- `installers/` — validated Android `.mcaddon` and `.mcpack` installers.
- `tools/` — repeatable build, packaging, and validation scripts.

## Testing

Start with the High-Compatible Android profile. Test nighttime fireflies with `/time set night` in a forest or swamp, test weather with `/weather rain` and `/weather thunder`, and test water caustics and underwater rays in a clear body of water with Vibrant Visuals enabled.

The pack uses Bedrock-native resource-pack features and does not contain Java GLSL, OptiFine, or Iris shader files. Final rendering depends on the Minecraft Bedrock build, device GPU, graphics settings, and Vibrant Visuals support.
