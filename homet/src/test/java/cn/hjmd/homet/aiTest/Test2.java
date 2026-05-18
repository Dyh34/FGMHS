package cn.hjmd.homet.aiTest;

import cn.hjmd.homet.entity.HealthDateVO;
import cn.hjmd.homet.entity.MedicalRecord;
import cn.hjmd.homet.entity.Result;
import cn.hjmd.homet.entity.UserMemberDTO;
import cn.hjmd.homet.service.UserService;
import cn.hjmd.homet.service.impl.HealthDataServiceImpl;
import org.junit.jupiter.api.Test;
import cn.hjmd.homet.service.HealthDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class Test2 {
    @Autowired
    HealthDataService healthDataService;
    @Autowired
    UserService userService;

    @Test
    public void test() {

        Result a = healthDataService.getUserInfo(4);
        System.out.printf(a.toString());
    }
}

