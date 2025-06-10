package com.chrona.backend.api.dtos;

import java.time.LocalDate;

public record ExamRequestDTO(String name,
LocalDate date,
Short difficulty,
Short confidence,
Long secondsSpent) { }