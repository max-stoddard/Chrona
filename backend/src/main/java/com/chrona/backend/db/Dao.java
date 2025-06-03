package com.chrona.backend.db;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface Dao<T> {
    public Optional<T> select(UUID id);
    
    public List<T> selectAll();

    public boolean insert(T entity);

    public void update(T entity);

    public boolean delete(UUID id);
}
