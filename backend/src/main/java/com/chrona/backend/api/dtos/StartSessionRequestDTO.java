package com.chrona.backend.api.dtos;

import java.time.Instant;
import java.util.UUID;

public record StartSessionRequestDTO(UUID user_id,
UUID subject_id,
UUID exam_id,
Instant started_at) { }