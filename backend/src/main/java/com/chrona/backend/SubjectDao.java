package com.chrona.backend;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import jakarta.websocket.OnClose;

public class SubjectDao implements Dao<UserSubject> {

    private JdbcTemplate jdbcTemplate;

    public JdbcTemplate getJdbcTemplate() 
    {
        return jdbcTemplate;
    }

    @Override
    public List<UserSubject> getAll() {
        return jdbcTemplate.query("SELECT * FROM user_subjects", 
        new RowMapper<UserSubject>() {
            public UserSubject mapRow(ResultSet rs, int rowNum) throws SQLException {
                UserSubject subject = new UserSubject();
                subject.set_subject_ID(rs.getObject("subject_id", UUID.class));
                subject.set_user_id(rs.getObject("user_id", UUID.class));
                subject.set_subject_name(rs.getString("subject_name"));
                return subject;
            }
        });
    }


    
    
    
}
