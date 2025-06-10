package com.chrona.backend.api.dtos;

import java.util.UUID;

/* outbound DTOs */
public record CreateSubjectDTO(
    UUID subject_id
) { }