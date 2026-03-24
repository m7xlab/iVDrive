import re

changelog_path = '/home/openfang/Documents/Projects/iVDrive_Production/iVDrive/CHANGELOG.md'
with open(changelog_path, 'r') as f:
    content = f.read()

new_version = """## [v1.0.20] - 2026-03-24

### Added 🌟
- **Admin Platform Statistics Dashboard**: Introduced a comprehensive global metrics dashboard for administrators under the `/admin` page. Displays total users, fleet size, sync error rates, connector health, and total telemetry tracking volume.
- **Fleet Distribution Visualization**: Added visual Unicode country flags (e.g. 🇱🇹, 🇬🇧, 🇫🇷) directly to the admin dashboard's fleet distribution metrics.

### Fixed 🛠
- **Target SoC Polling Bug**: Fixed an issue in the Smart Polling system where the `Target SoC` charging parameter was not saving to the database when the vehicle was disconnected or parked, causing the dashboard to occasionally show outdated Target SoC levels.
- **Database Migration Crash**: Repaired a broken `alembic` migration chain (`Multiple head revisions`) affecting production database deployments and schema upgrades.

"""

content = content.replace("## [v1.0.19.1]", new_version + "## [v1.0.19.1]")

with open(changelog_path, 'w') as f:
    f.write(content)
