package cn.hjmd.homet.entity;

import lombok.Data;

@Data
public class Result<T> {

    /*
     * 状态码
     */
    private Integer code;

    /*
     * 提示信息
     */
    private String message;

    /*
     * 数据
     */
    private T data;



    /*
     * 成功返回
     */
    public static <T> Result<T> success(T data){

        Result<T> result = new Result<>();

        result.setCode(200);

        result.setMessage("success");

        result.setData(data);

        return result;

    }



    /*
     * 成功（无数据）
     */
    public static <T> Result<T> success(){

        Result<T> result = new Result<>();

        result.setCode(200);

        result.setMessage("success");

        return result;

    }



    /*
     * 失败返回
     */
    public static <T> Result<T> error(String message){

        Result<T> result = new Result<>();

        result.setCode(500);

        result.setMessage(message);

        return result;

    }

    public static Result fail(String msg) {
        Result result = new Result<>();
        result.setCode(500);
        result.setMessage(msg);
        return result;
    }
}