import os

files_to_update = [
    'app/landing-client.tsx',
    'app/(marketing)/precos/precos-client.tsx',
    'app/(dashboard)/dashboard/dashboard-client.tsx',
    'app/(dashboard)/learn/learn-client.tsx',
    'app/(dashboard)/kids/kids-client.tsx'
]

replacements = [
    ('#D8B4FE', '#A855F7'),
    ('#FDA4AF', '#EC4899'),
    ('#6EE7B7', '#10B981')
]

for file_path in files_to_update:
    path = os.path.join(os.getcwd(), '..', '..', '..', '..', 'projetos', 'biblia-oficial', file_path)
    # Actually wait. The Cwd for run_command will be whatever.
    # The absolute path to my project is "C:\projetos\biblia-oficial"
    path = os.path.join("C:\\projetos\\biblia-oficial", file_path)
    
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        for old, new in replacements:
            content = content.replace(old, new)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {path}")
