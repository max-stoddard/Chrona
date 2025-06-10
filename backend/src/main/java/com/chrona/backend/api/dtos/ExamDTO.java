package com.chrona.backend.api.dtos;

import java.time.LocalDate;
import java.util.UUID;

public record ExamDTO(
    UUID   exam_id,
    String exam_name,
    LocalDate exam_date,
    short exam_difficulty,
    short  exam_confidence,
    long   exam_seconds_spent
) { }