package cn.hjmd.homet.entity;

import lombok.Data;

@Data
public class UserMemberDTO {
    private int id;
    private boolean isSelf;
    private String username;
    private String nickname;
    private int gender;
    private int age;
    private int familyId;


}
