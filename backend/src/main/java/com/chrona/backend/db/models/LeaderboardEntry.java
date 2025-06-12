package com.chrona.backend.db.models;

public record LeaderboardEntry(
    String email,
    Long totalSeconds
) {}
