import asyncio
from uuid import UUID
from datetime import UTC, datetime, timedelta
from app.database import async_session
from sqlalchemy import select
from app.models.vehicle import ConnectorSession
from app.services.crypto import decrypt_field, encrypt_field
import httpx

async def main():
    async with async_session() as session:
        user_vehicle_id = UUID("023b3fdc-40a8-457b-a3c6-d671a3b7168f")
        result = await session.execute(select(ConnectorSession).where(ConnectorSession.user_vehicle_id == user_vehicle_id))
        cs = result.scalar_one_or_none()
        
        access_token = decrypt_field(cs.access_token_encrypted)
        refresh_token = decrypt_field(cs.refresh_token_encrypted)
        
        from app.services.skoda_auth import SkodaAuthClient
        if cs.token_expires_at and cs.token_expires_at < datetime.now(UTC) + timedelta(minutes=2):
            auth = SkodaAuthClient()
            tokens = await auth.refresh(refresh_token)
            access_token = tokens.get("accessToken") or tokens.get("access_token", "")

        from app.services.skoda_api import SkodaAPIClient
        from app.models.vehicle import UserVehicle
        
        result2 = await session.execute(select(UserVehicle).where(UserVehicle.id == user_vehicle_id))
        uv = result2.scalar_one_or_none()
        
        # we need the actual vin
        vin = decrypt_field(uv.vin_encrypted) if hasattr(uv, 'vin_encrypted') else uv.vin if hasattr(uv, 'vin') else None
        
        if not vin:
            # Let's get the cars to get real VIN
            async with httpx.AsyncClient() as client:
                res = await client.get(
                    "https://mysmob.api.connect.skoda-auto.cz/api/v2/garage/vehicles",
                    headers={"Authorization": f"Bearer {access_token}", "User-Agent": "iVDrive/1.0"}
                )
                print("Garage Status:", res.status_code)
                for v in res.json():
                    vin = v.get("vin")
                    print("Found VIN:", vin)
                    break
        
        print("Using VIN:", vin)
        
        api = SkodaAPIClient(access_token)
        res = await api.get_charging(vin)
        print("Model data:")
        print(res.model_dump_json(indent=2))

if __name__ == "__main__":
    asyncio.run(main())
