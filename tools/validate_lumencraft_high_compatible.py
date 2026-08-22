from pathlib import Path
import json
import zipfile
from PIL import Image

root = Path('/home/ubuntu/LumenCraft_LuminousDreams')
resource_pkg = Path('/home/ubuntu/LumenCraft_Android_High_Compatible.mcpack')
behavior_pkg = Path('/home/ubuntu/LumenCraft_Android_High_Compatible_Companion.mcpack')
addon_pkg = Path('/home/ubuntu/LumenCraft_Android_High_Compatible_Complete.mcaddon')

manifest = json.loads((root / 'manifest.json').read_text())
assert manifest['format_version'] == 2
assert manifest['header']['version'] == [5, 5, 0]
assert manifest['header']['uuid'] != '00000000-0000-0000-0000-000000000000'
assert [s['folder_name'] for s in manifest['subpacks']] == ['low', 'mid', 'android_high', 'high']
assert next(s for s in manifest['subpacks'] if s['folder_name'] == 'android_high')['name'] == 'High-Compatible Android'

p = root / 'subpacks' / 'android_high'
max_width = 0
png_count = 0
for file in p.rglob('*.png'):
    with Image.open(file) as image:
        max_width = max(max_width, image.width)
        png_count += 1
assert max_width <= 32
assert (p / 'textures/textures_list.json').exists()
assert (p / 'lighting/global.json').exists()
assert (p / 'water/water.json').exists()
assert (p / 'fogs/default_fog_settings.json').exists()

for file in p.rglob('*.texture_set.json'):
    data = json.loads(file.read_text())
    layers = data.get('minecraft:texture_set', data)
    assert not ('normal' in layers and 'heightmap' in layers)

with zipfile.ZipFile(resource_pkg) as z:
    assert z.testzip() is None
    assert 'manifest.json' in z.namelist()
    assert json.loads(z.read('manifest.json'))['header']['version'] == [5, 5, 0]
with zipfile.ZipFile(behavior_pkg) as z:
    assert z.testzip() is None
    assert 'manifest.json' in z.namelist()
    behavior = json.loads(z.read('manifest.json'))
    assert behavior['dependencies'][0]['uuid'] == manifest['header']['uuid']
    assert behavior['dependencies'][0]['version'] == [5, 5, 0]
with zipfile.ZipFile(addon_pkg) as z:
    assert z.testzip() is None
    assert set(z.namelist()) == {resource_pkg.name, behavior_pkg.name}
print('HIGH_COMPATIBLE_MAX_WIDTH=', max_width)
print('HIGH_COMPATIBLE_PNG_COUNT=', png_count)
print('SUBPACK_METADATA_VALID')
print('PBR_LAYER_RULES_VALID')
print('ARCHIVES_VALID')
