package com.chrona.backend.db;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@Service
class WebService<T> {

    @Autowired
    private Dao<T> table_dao;


    public void WebService(Dao<T> table_Dao) {
        this.table_dao = table_Dao;
    }

    public List<T> getAll() {
        return table_dao.selectAll();
    }

    public Boolean add(T entity) {
        return table_dao.insert(entity);
    }

    public Boolean delete(UUID id) {
        return table_dao.delete(id);
    }

    public Optional<T> get(UUID id) {
        return table_dao.select(id);
    } 

}