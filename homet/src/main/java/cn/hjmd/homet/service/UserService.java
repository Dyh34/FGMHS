package cn.hjmd.homet.service;

import cn.hjmd.homet.entity.LoginDTO;
import cn.hjmd.homet.entity.User;
import cn.hjmd.homet.entity.UserMemberDTO;

import java.util.List;

public interface UserService {
    UserMemberDTO getById(Integer loginUserId);

    LoginDTO register(LoginDTO  loginDTO);

    LoginDTO login(LoginDTO loginDTO);

    int getFamilyId(int id);

    List<UserMemberDTO> getByFamilyMember(int familyId);
}
