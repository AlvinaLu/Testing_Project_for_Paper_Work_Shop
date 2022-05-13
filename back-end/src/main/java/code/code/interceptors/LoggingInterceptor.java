package code.code.interceptors;

import code.code.rest.WebController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LoggingInterceptor implements HandlerInterceptor {
    private static final Logger LOG = LoggerFactory.getLogger(LoggingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        LOG.info("Request headers:");
        request.getHeaderNames().asIterator().forEachRemaining(it -> LOG.info(it + ":" + request.getHeader(it)));
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        LOG.info("Response headers:");
        response.getHeaderNames().iterator().forEachRemaining(it -> LOG.info(it + ":" + response.getHeader(it)));
    }
}
