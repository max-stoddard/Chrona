package com.chrona.backend.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * DAO implementation that uses {@link JdbcTemplate} to access the <code>user_subjects</code>
 * table stored in Supabase (PostgreSQL). The class follows the classical DAO pattern,
 * keeping persistence concerns separate from the service layer.
 */
@Repository
public class UserSubjectDao implements Dao<UserSubject> {

    private final JdbcTemplate jdbcTemplate;

    /**
     * Maps a single row of <code>user_subjects</code> to a {@link UserSubject} aggregate.
     */
    private static final RowMapper<UserSubject> ROW_MAPPER = (rs, rowNum) -> new UserSubject(
            rs.getObject("subject_id", UUID.class),
            rs.getObject("user_id", UUID.class),
            rs.getString("subject_name")
    );

    @Autowired
    public UserSubjectDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Return a single {@link UserSubject} by primary key.
     */
    @Override
    public Optional<UserSubject> select(UUID id) {
        final String sql = "SELECT subject_id, user_id, subject_name FROM user_subjects WHERE subject_id = ?";
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(sql, ROW_MAPPER, id));
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }

    /**
     * Return all rows in <code>user_subjects</code>.
     */
    @Override
    public List<UserSubject> selectAll() {
        final String sql = "SELECT subject_id, user_id, subject_name FROM user_subjects";
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    /**
     * Persist a new {@link UserSubject}. If the key already exists, the row is updated (PostgreSQL UPSERT).
     */
    @Override
    public boolean insert(UserSubject entity) {
        final String sql = """
                INSERT INTO user_subjects(subject_id, user_id, subject_name)
                VALUES (?, ?, ?)
                ON CONFLICT (subject_id) DO UPDATE
                SET user_id      = EXCLUDED.user_id,
                    subject_name = EXCLUDED.subject_name""";
        jdbcTemplate.update(sql,
                entity.getSubjectId(),
                entity.getUserId(),
                entity.getSubjectName());
    }

    /**
     * Update the <code>user_id</code> or <code>subject_name</code> of an existing row.
     */
    @Override
    public void update(UserSubject entity) {
        final String sql = "UPDATE user_subjects SET user_id = ?, subject_name = ? WHERE subject_id = ?";
        jdbcTemplate.update(sql,
                entity.getUserId(),
                entity.getSubjectName(),
                entity.getSubjectId());
    }

    /**
     * Delete a row by primary key.
     */
    @Override
    public boolean delete(UUID id) {
        final String sql = "DELETE FROM user_subjects WHERE subject_id = ?";
        return jdbcTemplate.update(sql, id) > 0;
    }

    /**
     * Expose the underlying {@link JdbcTemplate} in case it is required by higher-level
     * components (e.g. bulk operations).
     */
    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
}