package cn.hjmd.homet.entity;

import lombok.Data;

import java.math.BigInteger;

@Data
public class LoginDTO {

    /**
     * 账号 前端传过来
     */
    private String username="";

    /**
     * 密码 前端传过来
     */
    private String password="";

    private int id=0;
    private String message="";
    private String token="";
    private String nickname="";

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}