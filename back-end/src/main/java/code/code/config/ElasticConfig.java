package code.code.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;

@Configuration
@ConditionalOnProperty(value = "elastic.enabled",matchIfMissing = false)
public class ElasticConfig {
    @Bean
    public RestHighLevelClient client(@Value("${elastic.host-and-port}") String hostAndPost) {
        ClientConfiguration clientConfiguration
                = ClientConfiguration.builder()
                .connectedTo(hostAndPost)
                .build();

        return RestClients.create(clientConfiguration).rest();
    }

    @Bean
    public ElasticsearchOperations elasticsearchTemplate(@Value("${elastic.host-and-port}") String hostAndPost) {
        return new ElasticsearchRestTemplate(client(hostAndPost));
    }
}
