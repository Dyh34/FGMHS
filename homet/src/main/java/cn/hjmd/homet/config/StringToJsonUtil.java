package cn.hjmd.homet.config;

import java.util.HashMap;
import java.util.Map;

public class StringToJsonUtil {

    // 直接返回 Map！！！ 彻底解决转义！
    public static Map<String, String> convertToMap(String input) {
        Map<String, String> map = new HashMap<>();

        if (input == null || input.isEmpty()) {
            return map;
        }

        try {
            String content = input.trim();
            if (content.startsWith("{")) {
                content = content.substring(1);
            }
            if (content.endsWith("}")) {
                content = content.substring(0, content.length() - 1);
            }

            String[] keyValues = content.split(", ");
            for (String pair : keyValues) {
                if (pair.contains("=")) {
                    String[] kv = pair.split("=", 2);
                    String key = kv[0].trim();
                    String value = kv[1].trim();
                    map.put(key, value);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return map;
    }
}