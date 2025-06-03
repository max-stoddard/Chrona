package com.chrona.backend.db;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@Service
class WebService<T> {
    @Autowired
    private Dao<T> table_dao;


    public WebService(Dao<T> tableDao) {
        this.table_dao = tableDao;
    }

    public List<T> getSome(int count) {
        return table_dao.selectSome(count);
    }

    public Boolean insert(T entity) {
        return table_dao.insert(entity);
    }

    public Boolean delete(UUID id) {
        return table_dao.delete(id);
    }

    public Optional<T> get(UUID id) {
        return table_dao.select(id);
    } 

}