package code.code.messagingstompwebsocket;

import code.code.entities.Item;
import code.code.model.Good;

import java.util.ArrayList;
import java.util.List;

public class ResponseToGoods {
    private Integer status;
    private List<Good> arrayGoods = new ArrayList<>();
    private String errorText;



    public ResponseToGoods(Integer status) {
        this.status = status;
    }

    public ResponseToGoods(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Good> getArrayGoods() {
        return arrayGoods;
    }

    public void setArrayGoods(List<Good> arrayGoods) {
        this.arrayGoods = arrayGoods;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }


}

