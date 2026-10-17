# Realtime gateway (planned runtime)

The architecture assigns presence, alerts, session updates and authorized proctor commands to a separately scalable Socket.IO gateway. It is not implemented yet. Add authenticated socket handshakes, tenant and assignment authorization, Redis adapter, message schemas, rate limits, audit logging and reconnect semantics before exposing this service. Do not broadcast sensitive evidence or trust client tenant IDs.
