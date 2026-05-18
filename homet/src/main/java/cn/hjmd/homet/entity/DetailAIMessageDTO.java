package cn.hjmd.homet.entity;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DetailAIMessageDTO {
    LocalDate createTime;
    private  String analysisContent;
    private  int userId;
    private  String analysisTitle;

}
