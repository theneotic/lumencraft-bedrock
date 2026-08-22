from pathlib import Path
import json
import zipfile

RESOURCE = Path('/home/ubuntu/LumenCraft_LuminousDreams')
BEHAVIOR = Path('/home/ubuntu/LumenCraft_LuminousDreams_Night_Water_Firefly_Companion')
RESOURCE_VERSION = [5, 5, 0]
BEHAVIOR_VERSION = [7, 2, 0]

resource_manifest = json.loads((RESOURCE / 'manifest.json').read_text())
resource_manifest['format_version'] = 2
resource_manifest['header']['version'] = RESOURCE_VERSION
resource_manifest['header']['min_engine_version'] = [1, 21, 120]
for module in resource_manifest['modules']:
    module['version'] = RESOURCE_VERSION
resource_manifest['subpacks'] = [
    {'folder_name': 'low', 'name': 'Low Performance', 'memory_performance_tier': 1},
    {'folder_name': 'mid', 'name': 'Balanced Performance', 'memory_performance_tier': 2},
    {'folder_name': 'android_high', 'name': 'High-Compatible Android', 'memory_performance_tier': 2},
    {'folder_name': 'high', 'name': 'High Graphics', 'memory_performance_tier': 5},
]
resource_manifest.pop('pack_scope', None)
resource_manifest.pop('metadata', None)
(RESOURCE / 'manifest.json').write_text(json.dumps(resource_manifest, indent=2, ensure_ascii=False) + '\n')

behavior_manifest = json.loads((BEHAVIOR / 'manifest.json').read_text())
behavior_manifest['format_version'] = 2
behavior_manifest['header']['version'] = BEHAVIOR_VERSION
behavior_manifest['header']['min_engine_version'] = [1, 21, 120]
for module in behavior_manifest['modules']:
    module['version'] = BEHAVIOR_VERSION
for dependency in behavior_manifest.get('dependencies', []):
    if 'uuid' in dependency:
        dependency['uuid'] = resource_manifest['header']['uuid']
        dependency['version'] = RESOURCE_VERSION
(BEHAVIOR / 'manifest.json').write_text(json.dumps(behavior_manifest, indent=2, ensure_ascii=False) + '\n')


def package(source, output):
    if output.exists():
        output.unlink()
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for file in sorted(source.rglob('*')):
            if file.is_file():
                archive.write(file, file.relative_to(source).as_posix())

resource_package = Path('/home/ubuntu/LumenCraft_Android_High_Compatible.mcpack')
behavior_package = Path('/home/ubuntu/LumenCraft_Android_High_Compatible_Companion.mcpack')
addon_package = Path('/home/ubuntu/LumenCraft_Android_High_Compatible_Complete.mcaddon')
package(RESOURCE, resource_package)
package(BEHAVIOR, behavior_package)
if addon_package.exists():
    addon_package.unlink()
with zipfile.ZipFile(addon_package, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    archive.write(resource_package, resource_package.name)
    archive.write(behavior_package, behavior_package.name)
print(resource_package)
print(behavior_package)
print(addon_package)
