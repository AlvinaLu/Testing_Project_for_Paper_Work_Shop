package code.code.messagingstompwebsocket;


import code.code.model.CategoryModel;

import java.util.ArrayList;
import java.util.List;

public class ResponseToCategory {
    private Integer status;
    private List<CategoryModel> arrayCategories = new ArrayList<>();
    private String errorText;

    public ResponseToCategory(Integer status) {
        this.status = status;

    }

    public ResponseToCategory(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<CategoryModel> getArrayCategories() {
        return arrayCategories;
    }

    public void setArrayCategories(List<CategoryModel> arrayCategories) {
        this.arrayCategories = arrayCategories;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }

    @Override
    public String toString() {
        return "ResponseToCategory{" +
                "status=" + status +
                ", arrayCategories=" + arrayCategories +
                ", errorText='" + errorText + '\'' +
                '}';
    }

}
