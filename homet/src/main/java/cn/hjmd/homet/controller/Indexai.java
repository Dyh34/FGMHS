package cn.hjmd.homet.controller;

import cn.hjmd.homet.service.impl.IndexAIImpl;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/index")
public class Indexai {
    @Autowired
    private IndexAIImpl indexAI;

    @GetMapping("/ai")
    public String aiAD() throws IOException {

        String me = indexAI.getAd();
        JSONObject result = JSON.parseObject(me);
        String a = result
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");
        System.out.println(a);
        return a;
    }
}
