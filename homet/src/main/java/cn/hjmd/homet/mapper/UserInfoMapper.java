package cn.hjmd.homet.mapper;

import cn.hjmd.homet.entity.HealthDateVO;
import cn.hjmd.homet.entity.MedicalRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserInfoMapper {
    HealthDateVO getUserInfobyID(@Param("id") int id);


    List<MedicalRecord> getUserRecord(int id);
}
