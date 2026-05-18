package cn.hjmd.homet.service.impl;

import cn.hjmd.homet.config.DeepSeekConfig;
import cn.hjmd.homet.entity.DetailAIMessageDTO;
import cn.hjmd.homet.entity.Result;
import cn.hjmd.homet.mapper.PhyDetailAIMapper;
import cn.hjmd.homet.service.HealthDataService;
import cn.hjmd.homet.service.getPhyDetailAI;
import com.fasterxml.jackson.core.JsonProcessingException;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Map;
import java.util.List;

@Service
public class getPhyDetailAIImpl implements getPhyDetailAI {

    private final DeepSeekConfig config;
    private final ObjectMapper objectMapper = new ObjectMapper(); // Spring自带

    public getPhyDetailAIImpl(DeepSeekConfig config) {
        this.config = config;
    }

    @Autowired
    HealthDataService healthDataService;
    @Autowired
    PhyDetailAIMapper phyDetailAIMapper;

    @Override
    public Result getPhyDetailAI(int id) throws IOException {
        String filePath = "src/main/resources/static/PhyDetailAISuggestionsPrompt.txt";
        String systemPrompt = Files.readString(Paths.get(filePath));

        String usermsg = healthDataService.getUserInfo(id).toString() + healthDataService.getUserRecord(id).toString();

        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
                .readTimeout(120, java.util.concurrent.TimeUnit.SECONDS)
                .writeTimeout(120, java.util.concurrent.TimeUnit.SECONDS)
                .build();

        // 构建请求（用 Map 代替 fastjson）
        var requestMap = Map.of(
                "model", "deepseek-v4-flash",
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt),
                        Map.of("role", "user", "content", usermsg)
                )
        );

        RequestBody body = RequestBody.create(
                objectMapper.writeValueAsString(requestMap),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url(config.getUrl())
                .post(body)
                .addHeader("Authorization", "Bearer " + config.getApiKey())
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = client.newCall(request).execute();

        if (response.body() == null) {
            return Result.fail("AI接口返回为空");
        }

        String responseBody = response.body().string();

        // ===================== 核心解析 =====================
        // 1. 解析大模型返回
        var root = objectMapper.readTree(responseBody);
        String contentJsonStr = root
                .path("choices")
                .get(0)
                .path("message")
                .path("content")
                .asText();

        // 2. 把 content 转成对象返回前端
        Object resultObj = objectMapper.readValue(contentJsonStr, Object.class);
        DetailAIMessageDTO detailAIMessageDTO = new DetailAIMessageDTO();
        detailAIMessageDTO.setUserId(id);
        detailAIMessageDTO.setAnalysisContent(resultObj.toString());
        detailAIMessageDTO.setCreateTime(LocalDate.now());
        phyDetailAIMapper.saveAImsg(detailAIMessageDTO);
        return Result.success(resultObj);
    }

    @Override
    public DetailAIMessageDTO getPhyDetailAIFromD(Integer id) throws JsonProcessingException {
        DetailAIMessageDTO detailAIMessageDTO = phyDetailAIMapper.getPhyAI(id);
        return detailAIMessageDTO;
    }
}
