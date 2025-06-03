package com.chrona.backend;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface Dao<T> {
    public List<T> getAll();
}
