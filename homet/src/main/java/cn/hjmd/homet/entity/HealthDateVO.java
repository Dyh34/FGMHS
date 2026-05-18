package cn.hjmd.homet.entity;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 健康档案 - 前端展示 VO
 * 只用于接口返回给 uni-app 页面显示
 */
@Data
public class HealthDateVO {

    // 唯一标识
    private Long id;

    // 用户信息
    private Long userId;

    // 记录日期（用户的健康数据日期）
    private LocalDate recordDate;
    private LocalTime upDateTime;

    // ====================== 基础身体数据 ======================
    private BigDecimal height;        // 身高(cm)
    private BigDecimal weight;        // 体重(kg)
    private BigDecimal bmi;           // BMI指数
    private BigDecimal waistline;     // 腰围(cm)
    private BigDecimal waistHipRatio; // 腰臀比
    private BigDecimal bodyFatRate;   // 体脂率(%)

    // ====================== 生命体征 ======================
    private Integer systolicPressure;   // 收缩压
    private Integer diastolicPressure;  // 舒张压
    private Integer restingHeartRate;   // 静息心率
    private BigDecimal bloodOxygen;      // 血氧
    private BigDecimal bodyTemperature; // 体温

    // ====================== 化验指标 ======================
    private BigDecimal fastingBloodGlucose; // 空腹血糖
    private BigDecimal uricAcid;            // 尿酸
    private BigDecimal totalCholesterol;   // 总胆固醇
    private String urineGlucose;            // 尿糖
    private String urineProtein;            // 尿蛋白
    private String occultBlood;            // 隐血

    // ====================== 睡眠 ======================
    private BigDecimal sleepDuration;   // 睡眠时长
    private LocalTime sleepTime;        // 入睡时间
    private BigDecimal deepSleepRate;   // 深睡率
    private String fatigueLevel;        // 疲劳程度

    // ====================== 生活习惯 ======================
    private Integer weeklyExerciseCount;  // 每周运动次数
    private Integer exerciseDuration;     // 每次运动时长
    private String smokingAmount;         // 吸烟量
    private String drinkingFrequency;     // 饮酒频率
    private Integer dailyWaterIntake;      // 每日饮水量
    private String mealRegularLevel;      // 饮食规律

    // ====================== 不适症状（0=无 1=有） ======================
    private Integer dizziness;      // 头晕
    private Integer palpitation;    // 心悸
    private Integer chestDistress;   // 胸闷
    private Integer jointPain;      // 关节痛
    private Integer insomnia;       // 失眠
    private Integer stomachDiscomfort; // 胃部不适
    private Integer anxietyEmotion;  // 焦虑情绪

    // ====================== 备注 ======================
    private String remark;


}