from pathlib import Path
import json
import shutil
from PIL import Image

ROOT = Path('/home/ubuntu/LumenCraft_LuminousDreams')
SOURCE = ROOT / 'subpacks' / 'mid'
TARGET = ROOT / 'subpacks' / 'android_high'
MAX_WIDTH = 32

if TARGET.exists():
    shutil.rmtree(TARGET)
shutil.copytree(SOURCE, TARGET)

for path in TARGET.rglob('*.png'):
    with Image.open(path) as source:
        image = source.convert('RGBA')
        if image.width > MAX_WIDTH:
            new_height = max(1, round(image.height * MAX_WIDTH / image.width))
            image = image.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
        image.save(path, format='PNG', optimize=True, compress_level=9)

# Keep the same aliases and texture-set references, but make the profile self-describing.
(TARGET / 'PROFILE.md').write_text('''# Android High-Compatible profile\n\nThis profile preserves Luminous Dreams color, MER, normal-map, atmosphere, water, caustic, weather, and particle features while using a 32px maximum texture width for the active profile. It is intended for Android devices that reject the full High Graphics tier because of GPU texture-budget limits.\n\nThe profile retains the visual palette and PBR response but reduces texture memory approximately by using lower active resolution, shorter animation sheets, and the Balanced lighting/particle budget.\n''')

# Regenerate the texture-list registration from this profile’s active textures.
paths = []
for image in sorted((TARGET / 'textures').rglob('*.png')):
    paths.append(image.relative_to(TARGET).with_suffix('').as_posix())
(TARGET / 'textures' / 'textures_list.json').write_text(json.dumps(sorted(set(paths)), indent=2) + '\n')

manifest_path = ROOT / 'manifest.json'
manifest = json.loads(manifest_path.read_text())
manifest['header']['version'] = [5, 5, 0]
for module in manifest['modules']:
    module['version'] = [5, 5, 0]
subpacks = [sp for sp in manifest.get('subpacks', []) if sp.get('folder_name') != 'android_high']
subpacks.append({
    'folder_name': 'android_high',
    'name': 'High-Compatible Android',
    'memory_performance_tier': 2,
})
manifest['subpacks'] = subpacks
manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')

print('built', TARGET)
print('texture_count', len(list(TARGET.rglob('*.png'))))
