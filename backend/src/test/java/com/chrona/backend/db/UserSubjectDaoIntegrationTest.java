package com.chrona.backend.db;


import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;


import com.chrona.backend.db.dataAccess.UserSubjectDao;
import com.chrona.backend.db.models.UserSubject;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UserSubjectDaoIntegrationTest {
    @Autowired
    private UserSubjectDao userSubjectDao;

    @Test
    void testGet5() {
        List<UserSubject> allSubjects = userSubjectDao.selectSome(5);
        assertThat(!allSubjects.isEmpty());
        for(var s : allSubjects) { System.out.println(s); }
    }

}
