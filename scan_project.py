import os
from collections import defaultdict

# הגדר את השורש של הפרויקט שלך
PROJECT_ROOT = "/Users/dnylhnwkyyb/lions-of-zion"

# גבולות לבדיקה
MAX_FILE_SIZE_MB = 5  # דוגמה: קבצים גדולים מ-5 מגה-בייט

def bytes_to_mb(size_bytes):
    return size_bytes / (1024 * 1024)

def scan_project(root_path):
    file_name_map = defaultdict(list)
    large_files = []
    suspicious_names = []

    for dirpath, dirnames, filenames in os.walk(root_path):
        # דילוג על תיקיות מיותרות
        if '.git' in dirnames:
            dirnames.remove('.git')
        if 'node_modules' in dirnames:
            dirnames.remove('node_modules')

        for filename in filenames:
            full_path = os.path.join(dirpath, filename)
            file_name_map[filename].append(full_path)

            try:
                size = os.path.getsize(full_path)
                size_mb = bytes_to_mb(size)
                if size_mb > MAX_FILE_SIZE_MB:
                    large_files.append((full_path, size_mb))
            except Exception as e:
                print(f"Could not get size for {full_path}: {e}")

            # חיפוש שמות חשודים - לדוגמה קבצים זמניים או גיבויים
            if filename.endswith(('~', '.bak', '.old', '.tmp')):
                suspicious_names.append(full_path)
            if filename.startswith('.') and filename != '.env':
                suspicious_names.append(full_path)

    # איתור כפילויות
    duplicates = {name: paths for name, paths in file_name_map.items() if len(paths) > 1}

    return duplicates, large_files, suspicious_names

def main():
    duplicates, large_files, suspicious_names = scan_project(PROJECT_ROOT)

    print("\n=== Duplicate Files ===")
    for name, paths in duplicates.items():
        print(f"{name}:")
        for p in paths:
            print(f"  - {p}")

    print("\n=== Large Files (>5MB) ===")
    for path, size_mb in large_files:
        print(f"{path} - {size_mb:.2f} MB")

    print("\n=== Suspicious File Names ===")
    for path in suspicious_names:
        print(f"{path}")

if __name__ == "__main__":
    main()
