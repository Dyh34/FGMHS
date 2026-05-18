package cn.hjmd.homet.controller;

import cn.hjmd.homet.entity.LoginDTO;
import cn.hjmd.homet.entity.Result;
import cn.hjmd.homet.entity.User;
import cn.hjmd.homet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;


    // 注册
    @PostMapping("/register")
    public Result register(@RequestBody LoginDTO dto) {
        LoginDTO loginDTO;
        loginDTO = userService.register(dto);
        return "注册成功".equals(loginDTO.getMessage()) ? Result.success(loginDTO) : Result.fail(loginDTO.getMessage());
    }

    // 登录
    @PostMapping("/login")
    public Result login(@RequestBody LoginDTO dto) {
        LoginDTO loginDTO;
        loginDTO = userService.login(dto);
        return "登录成功".equals(loginDTO.getMessage()) ? Result.success(loginDTO) : Result.fail(loginDTO.getMessage());
    }
}
