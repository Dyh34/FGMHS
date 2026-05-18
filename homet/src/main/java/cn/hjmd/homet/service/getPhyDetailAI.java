package cn.hjmd.homet.service;

import cn.hjmd.homet.entity.DetailAIMessageDTO;
import cn.hjmd.homet.entity.Result;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;

public interface getPhyDetailAI {
    Result getPhyDetailAI(int id) throws IOException;

    DetailAIMessageDTO getPhyDetailAIFromD(Integer id) throws JsonProcessingException;
}
