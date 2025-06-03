package com.chrona.backend;

import java.util.UUID;

import io.micrometer.common.lang.NonNull;

public class UserSubject {

    @NonNull
    private UUID subject_id;
    @NonNull
    private UUID user_id;
    
    @NonNull
    private String subject_name;

    public UUID getSubjectID() {
        return subject_id;
    }

    public UUID getUserID() {
        return user_id;
    }

    public String subject_name() {
        return subject_name;
    }

    public void set_subject_ID(UUID id) {
        this.subject_id = id;
    }

    public void set_user_id(UUID id) {
        this.user_id = id;
    }

    public void set_subject_name(String name) {
        this.subject_name = name;
    } 


}
