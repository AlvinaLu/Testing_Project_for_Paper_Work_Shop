package code.code.messagingstompwebsocket;

import code.code.model.Good;

import java.util.ArrayList;
import java.util.List;

public class ResponseToEditGood {

    private Integer status;
    private String errorText;

    public ResponseToEditGood(Integer status) {
        this.status = status;
    }

    public ResponseToEditGood(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }
}
