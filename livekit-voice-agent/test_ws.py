import asyncio
from livekit import rtc

async def main():
    with open('/tmp/token.txt', 'r') as f:
        token = f.read().strip()
    room = rtc.Room()
    url = "wss://job-buddy-kweizjpx.livekit.cloud"
    await room.connect(url, token)
    await asyncio.sleep(5)
    await room.disconnect()

asyncio.run(main())
