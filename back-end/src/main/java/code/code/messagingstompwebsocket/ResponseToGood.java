package code.code.messagingstompwebsocket;

import code.code.model.Good;

public class ResponseToGood {

        private Integer status;
        private Good good;
        private String errorText;

        public ResponseToGood(Integer status) {
                this.status = status;
        }

        public ResponseToGood(Integer status, String errorText) {
                this.status = status;
                this.errorText = errorText;
        }

        public Integer getStatus() {
                return status;
        }

        public void setStatus(Integer status) {
                this.status = status;
        }

        public Good getGood() {
                return good;
        }

        public void setGood(Good good) {
                this.good = good;
        }

        public String getErrorText() {
                return errorText;
        }

        public void setErrorText(String errorText) {
                this.errorText = errorText;
        }

        @Override
        public String toString() {
                return "ResponseToGood{" +
                        "status=" + status +
                        ", good=" + good +
                        ", errorText='" + errorText + '\'' +
                        '}';
        }
}
