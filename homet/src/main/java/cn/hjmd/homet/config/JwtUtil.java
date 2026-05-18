package cn.hjmd.homet.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class JwtUtil {

    // 密钥（至少32位）
    private static final String SECRET =
            "wher-eism-ytru-elyl-ovei-real-ydon-tkno-wdyh";

    // 密钥对象
    private static final SecretKey KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    /**
     * 生成token
     */
    public static String createToken(Integer id,String username){

        return Jwts.builder()

                // 存用户信息
                .claim("id", id)

                .claim("username", username)

                // 签名
                .signWith(KEY, SignatureAlgorithm.HS256)

                .compact();
    }

    /**
     * 解析token
     */
    public static Claims parseToken(String token){

        return Jwts.parserBuilder()

                .setSigningKey(KEY)

                .build()

                .parseClaimsJws(token)

                .getBody();
    }

}