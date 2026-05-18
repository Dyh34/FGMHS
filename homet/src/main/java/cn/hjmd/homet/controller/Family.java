package cn.hjmd.homet.controller;

import cn.hjmd.homet.config.JwtUtil;
import cn.hjmd.homet.entity.MedicalRecord;
import cn.hjmd.homet.entity.Result;
import cn.hjmd.homet.entity.User;
import cn.hjmd.homet.entity.UserMemberDTO;
import cn.hjmd.homet.service.HealthDataService;
import cn.hjmd.homet.service.UserService;
import cn.hjmd.homet.service.impl.HealthDataServiceImpl;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//   http://localhost:8080/family/gethd?id=8
@RestController
@RequestMapping("/family")
public class Family {
    @Autowired
    private HealthDataService healthDataService;

    @Autowired
    private UserService userService;

    @GetMapping("/gethd")
    public Result GetUserInfo(HttpServletRequest request, @RequestParam Integer familyUserId){
        // token 只用来【校验是否登录】，不用来查数据
        String token = request.getHeader("token");
        Claims claims = JwtUtil.parseToken(token);

        // 关键：用前端传的 familyUserId 查询！
        return healthDataService.getUserInfo(familyUserId);
    }

        @GetMapping("/info")
        public Result getFamilyInfo(HttpServletRequest request){

            // token
            String token = request.getHeader("token");
            // 解析JWT
            Claims claims = JwtUtil.parseToken(token);

            // token解析用户id
            int loginUserId = (Integer) claims.get("id");

            // 当前用户
            UserMemberDTO self = userService.getById(loginUserId);
                self.setSelf(true);
            // 查询家庭成员
            List<UserMemberDTO> familyList =
                    userService.getByFamilyMember(
                            userService.getFamilyId(loginUserId)
                    );
            for (UserMemberDTO u : familyList) {
                if (loginUserId == u.getId()) {
                    u.setSelf(true);
                }
            }


            // 封装返回
            Map<String,Object> map =
                    new HashMap<>();

            map.put("self",self);

            map.put("familyList",familyList);

            return Result.success(map);
        }
    @GetMapping("/record")
    public Result GetUserRecord(HttpServletRequest request, @RequestParam Integer familyUserId){
        // token 只用来【校验是否登录】，不用来查数据
        String token = request.getHeader("token");
        Claims claims = JwtUtil.parseToken(token);
        List<MedicalRecord> allme = healthDataService.getUserRecord(familyUserId);
        // 关键：用前端传的 familyUserId 查询！
        return  Result.success(allme);
    }
}
