package cn.hjmd.homet.service.impl;
import cn.hjmd.homet.config.DeepSeekConfig;
import cn.hjmd.homet.service.IndexAI;
import okhttp3.*;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class IndexAIImpl implements IndexAI {



    private final DeepSeekConfig config;

    public IndexAIImpl(DeepSeekConfig config) {
        this.config = config;
    }

    public String getAd() throws IOException {
        String filePath = "src/main/resources/static/indexAIPrompt.txt";
        String systemPrompt = Files.readString(Paths.get(filePath));

        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
                .readTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
                .writeTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
                .build();

        JSONObject js = new JSONObject();
        JSONObject json = new JSONObject();
        json.put("model","deepseek-v4-pro");
        JSONArray messages = new JSONArray();
        JSONObject systemMessage = new JSONObject();
        systemMessage.put("role","system");
        systemMessage.put("content",systemPrompt);
        JSONObject userMessage = new JSONObject();
        userMessage.put("role","user");
        userMessage.put("content","身体信息：\n" +
                "男性，58岁，身高172cm，体重85kg，腰围96cm，空腹血糖6.8mmol/L，血脂偏高（甘油三酯2.6mmol/L），长期吸烟（20支/天，30年），无高血压史\n" +
                "\n" +
                "近期病历：\n" +
                "诊断：2型糖尿病（初诊3个月）、轻度脂肪肝；用药：二甲双胍片（0.5g/次，每日2次）；近期检查：踝肱指数0.92（轻度下肢动脉硬化倾向）；过敏史：青霉素过敏；无手术史");

        messages.add(systemMessage);
        messages.add(userMessage);
        json.put("messages",messages);

        RequestBody body = RequestBody.create(
                json.toJSONString(),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url(config.getUrl())
                .post(body)
                .addHeader("Authorization", "Bearer " + config.getApiKey())
                .addHeader("Content-Type", "application/json")
                .build();
        //System.out.printf("<<<<<<"+request.toString()+">>>>>>>>");
        Response response = client.newCall(request).execute();

        if (response.body() == null) {
            return "接口无返回";
        }

        String result = response.body().string();
        return result;
    }

}
