package com.chrona.backend.api.dtos;

/* inbound DTO for create/update */
public record SubjectRequestDTO(
    String name,
    Long seconds_spent
) { }