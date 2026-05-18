package cn.hjmd.homet.service;

import cn.hjmd.homet.entity.HealthDateVO;
import cn.hjmd.homet.entity.MedicalRecord;
import cn.hjmd.homet.entity.Result;

import java.util.List;

public interface HealthDataService {
    Result getUserInfo(int id);

    List<MedicalRecord> getUserRecord(Integer familyUserId);
}
