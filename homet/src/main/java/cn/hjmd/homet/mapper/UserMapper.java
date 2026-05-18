package cn.hjmd.homet.mapper;

import cn.hjmd.homet.entity.LoginDTO;
import cn.hjmd.homet.entity.User;
import cn.hjmd.homet.entity.UserMemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

   LoginDTO selectUser(String username);
   UserMemberDTO getInfoById(int loginUserId);

    void regist (LoginDTO loginDTO);

    int getFaId(int id);

    List<UserMemberDTO> getAllmember(int familyId);
}
