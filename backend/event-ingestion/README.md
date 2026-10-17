# Proctoring event ingestion (planned runtime)

The target service validates the versioned event contract, authenticates the attempt, deduplicates by event ID, enforces sequence rules and records server receipt time. Keep event storage append-only. This runtime is not implemented yet.
