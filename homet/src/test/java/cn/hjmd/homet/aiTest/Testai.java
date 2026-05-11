package cn.hjmd.homet.aiTest;
import cn.hjmd.homet.config.DeepSeekConfig;
import cn.hjmd.homet.service.impl.IndexAIImpl;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import org.junit.jupiter.api.Test;

import java.io.IOException;
public class Testai {

    @Test
    public void testAI() throws IOException {
        DeepSeekConfig config = new DeepSeekConfig();
        config.setApiKey("sk-111f8a7b9ab54c63b3c12132b6afb5b1");
        config.setModel("deepseek-chat");
        config.setUrl("https://api.deepseek.com/chat/completions");
        IndexAIImpl indexAI = new IndexAIImpl(config);
        String me = indexAI.getAd();
        JSONObject result = JSON.parseObject(me);
        String a = result
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");
        System.out.println(a);
    }


}
