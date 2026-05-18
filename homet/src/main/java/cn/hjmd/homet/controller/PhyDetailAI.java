package cn.hjmd.homet.controller;

import cn.hjmd.homet.config.JwtUtil;
import cn.hjmd.homet.config.StringToJsonUtil;
import cn.hjmd.homet.entity.DetailAIMessageDTO;
import cn.hjmd.homet.entity.Result;
import cn.hjmd.homet.service.getPhyDetailAI;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@RestController
@RequestMapping("/phy")
public class PhyDetailAI {

    @Autowired
    private getPhyDetailAI getphyDetailAI;

    @GetMapping("aimsg")
    public Result getPhyDetailAI(HttpServletRequest request, @RequestParam Integer id) throws JsonProcessingException {
        String token = request.getHeader("token");
        Claims claims = JwtUtil.parseToken(token);

        DetailAIMessageDTO aimsg = getphyDetailAI.getPhyDetailAIFromD(id);

        if (aimsg == null) {
            try {
                return getphyDetailAI.getPhyDetailAI(id);
            } catch (Exception e) {
                return Result.fail("生成失败");
            }
        }

        LocalDate createTime = aimsg.getCreateTime();
        if (createTime == null || ChronoUnit.DAYS.between(createTime, LocalDate.now()) >= 7) {
            try {
                return getphyDetailAI.getPhyDetailAI(id);
            } catch (Exception e) {
                return Result.fail("更新失败");
            }
        }

        // ===================== 最终正确 =====================
        Map<String, String> data = StringToJsonUtil.convertToMap(aimsg.getAnalysisContent());
        return Result.success(data);
    }
}