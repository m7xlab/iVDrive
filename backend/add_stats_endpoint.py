import sys

filename = '/home/openfang/Documents/Projects/iVDrive_Production/iVDrive/backend/app/api/v1/admin.py'
with open(filename, 'r') as f:
    content = f.read()

# Add imports if not present
if "from sqlalchemy import select, update, func" not in content:
    content = content.replace("from sqlalchemy import select, update", "from sqlalchemy import select, update, func")
if "from app.models.vehicle import UserVehicle, ConnectorSession" not in content:
    content = content.replace("from app.models.user import User", "from app.models.user import User\nfrom app.models.vehicle import UserVehicle, ConnectorSession\nfrom app.models.telemetry import Trip, ChargingSession")

# Add endpoint
endpoint_code = """

@router.get("/statistics")
async def admin_statistics(
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(get_current_superuser)
):
    # Total Users
    total_users = (await db.execute(select(func.count(User.id)))).scalar() or 0
    # Pending Invites
    pending_invites = (await db.execute(select(func.count(InviteRequest.id)).where(InviteRequest.status == 'pending'))).scalar() or 0
    # Total Vehicles
    total_vehicles = (await db.execute(select(func.count(UserVehicle.id)))).scalar() or 0
    
    # Vehicles by Country
    country_rows = await db.execute(select(UserVehicle.country_code, func.count(UserVehicle.id)).group_by(UserVehicle.country_code))
    vehicles_by_country = [{"name": row[0] or "Unknown", "value": row[1]} for row in country_rows]
    
    # Vehicles by Model
    model_rows = await db.execute(select(UserVehicle.model, func.count(UserVehicle.id)).group_by(UserVehicle.model))
    vehicles_by_model = [{"name": row[0] or "Unknown", "value": row[1]} for row in model_rows]
    
    # Connector Status Health (token_error, active, auth_failed, etc.)
    status_rows = await db.execute(select(ConnectorSession.status, func.count(ConnectorSession.id)).group_by(ConnectorSession.status))
    connector_status = [{"name": row[0] or "Unknown", "value": row[1]} for row in status_rows]
    
    # Total Telemetry
    total_trips = (await db.execute(select(func.count(Trip.id)))).scalar() or 0
    total_charging_sessions = (await db.execute(select(func.count(ChargingSession.id)))).scalar() or 0
    
    # Calculate Sync Error Rate
    total_connectors = sum(item["value"] for item in connector_status)
    error_connectors = sum(item["value"] for item in connector_status if item["name"] in ("token_error", "auth_failed"))
    sync_error_rate = (error_connectors / total_connectors * 100) if total_connectors > 0 else 0.0

    return {
        "total_users": total_users,
        "pending_invites": pending_invites,
        "total_vehicles": total_vehicles,
        "total_trips": total_trips,
        "total_charging_sessions": total_charging_sessions,
        "vehicles_by_country": sorted(vehicles_by_country, key=lambda x: x["value"], reverse=True),
        "vehicles_by_model": sorted(vehicles_by_model, key=lambda x: x["value"], reverse=True),
        "connector_status": sorted(connector_status, key=lambda x: x["value"], reverse=True),
        "sync_error_rate": round(sync_error_rate, 1)
    }
"""

if "@router.get(\"/statistics\")" not in content:
    content += endpoint_code

with open(filename, 'w') as f:
    f.write(content)
