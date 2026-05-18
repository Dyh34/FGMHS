package cn.hjmd.homet.service.impl;

import cn.hjmd.homet.entity.HealthDateVO;
import cn.hjmd.homet.entity.MedicalRecord;
import cn.hjmd.homet.entity.Result;
import cn.hjmd.homet.mapper.UserInfoMapper;
import cn.hjmd.homet.mapper.UserMapper;
import cn.hjmd.homet.service.HealthDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthDataServiceImpl implements HealthDataService {

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Override
    public Result getUserInfo(int id) {

        if (userInfoMapper.getUserInfobyID(id)== null) {
            return Result.fail("用户不存在");
        }
        return Result.success(userInfoMapper.getUserInfobyID(id)) ;
    }

    @Override
    public List<MedicalRecord> getUserRecord(Integer familyUserId) {
        List<MedicalRecord> me = userInfoMapper.getUserRecord(familyUserId);
        return me;
    }
}
