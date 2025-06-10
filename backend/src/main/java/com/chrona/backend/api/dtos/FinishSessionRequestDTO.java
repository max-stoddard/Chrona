package com.chrona.backend.api.dtos;

import java.time.Instant;

public record FinishSessionRequestDTO(Instant ended_at,
 int seconds_spent,
 Short session_confidence,
 Short session_focus) { }