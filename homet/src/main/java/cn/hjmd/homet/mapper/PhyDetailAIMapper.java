package cn.hjmd.homet.mapper;

import cn.hjmd.homet.entity.DetailAIMessageDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PhyDetailAIMapper {
    void saveAImsg(DetailAIMessageDTO detailAIMessageDTO);

    DetailAIMessageDTO getPhyAI(int id);
}
