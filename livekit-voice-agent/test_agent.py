import asyncio
import os
from dotenv import load_dotenv
from livekit import agents, rtc
from livekit.agents import AgentServer, AgentSession, Agent, room_io

load_dotenv(".env.local")

async def my_agent(ctx: agents.JobContext):
    print(f"[DEBUG] Job received! Room: {ctx.room.name}, Agent: {os.getenv('LIVEKIT_AGENT_NAME', 'unnamed')}")
    
    # Try a minimal session start
    try:
        session = AgentSession(
            stt="assemblyai/universal-streaming:en",
            llm="openai/gpt-4o-mini",
            tts="cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        )
        
        print("[DEBUG] Starting session...")
        await session.start(room=ctx.room)
        print("[DEBUG] Session started.")
        
        await session.say("Hello, can you hear me? I am the test agent.")
        print("[DEBUG] Greeting sent.")
    except Exception as e:
        print(f"[ERROR] Session failed: {e}")

if __name__ == "__main__":
    server = AgentServer()
    server.rtc_session()(my_agent)
    print(f"Starting agent with name: {os.getenv('LIVEKIT_AGENT_NAME', 'unnamed')}")
    agents.cli.run_app(server)
