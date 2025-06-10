package com.chrona.backend.api.dtos;

import java.util.List;
import java.util.UUID;

public record SubjectDetailsDTO(
    UUID            subject_id,
    String          subject_name,
    long            subject_seconds_spent,
    List<ExamDTO>   exams
) { }