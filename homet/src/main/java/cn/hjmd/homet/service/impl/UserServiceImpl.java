package cn.hjmd.homet.service.impl;

import cn.hjmd.homet.config.JwtUtil;
import cn.hjmd.homet.entity.LoginDTO;
import cn.hjmd.homet.entity.User;
import cn.hjmd.homet.entity.UserMemberDTO;
import cn.hjmd.homet.mapper.UserMapper;
import cn.hjmd.homet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserMemberDTO getById(Integer loginUserId) {
        return userMapper.getInfoById(loginUserId);
    }

    @Override
    public LoginDTO register(LoginDTO loginDTO) {
        LoginDTO reuser=new LoginDTO();

        if(loginDTO.getUsername() == null || loginDTO.getPassword() == null){
            reuser.setMessage("账号密码不能为空");
            return reuser;
        }
        else if (userMapper.selectUser(loginDTO.getUsername())!=null) {
            reuser.setMessage("账号重复");
            return reuser;
        }
        else {
            userMapper.regist(loginDTO);
             reuser.setMessage("注册成功");
            reuser.setId(userMapper.selectUser(loginDTO.getUsername()).getId());
            reuser.setUsername(loginDTO.getUsername());
            reuser.setNickname(loginDTO.getNickname());
            String token = JwtUtil.createToken(
                    reuser.getId(),
                    reuser.getUsername()
            );
            reuser.setToken(token);
            return reuser;
        }


    }

    @Override
    public LoginDTO login(LoginDTO loginDTO) {
        LoginDTO reuser=new LoginDTO();
        // 1. 非空判断
        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();
        if (!StringUtils.hasText(username) || !StringUtils.hasText(password)) {
            reuser.setMessage("账号密码不能为空");
            return reuser;
        }

        // 2. 根据账号查询数据库用户
        LoginDTO user = userMapper.selectUser(username);
        // 3. 判断账号是否存在
        if (user == null) {
           reuser.setMessage("账号不存在，请先注册");
            return reuser;
        }

        // 4. 判断密码是否一致
        if (!user.getPassword().equals(password)) {
            reuser.setMessage("密码输入错误");
            return reuser;
        }

        // 5. 全部校验通过，登录成功
        reuser.setId(userMapper.selectUser(username).getId());
        reuser.setUsername(username);
        reuser.setNickname(user.getNickname());
        reuser.setMessage("登录成功");

        String token = JwtUtil.createToken(
                reuser.getId(),
                reuser.getUsername()
        );
        reuser.setToken(token);
        return  reuser;
    }

    @Override
    public int getFamilyId(int id) {
        return userMapper.getFaId(id);
    }

    @Override
    public List<UserMemberDTO> getByFamilyMember(int familyId){
        List<UserMemberDTO> userMemberDTOS = userMapper.getAllmember(familyId);
        return userMemberDTOS;
    };

}
