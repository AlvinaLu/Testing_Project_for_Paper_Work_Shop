package code.code;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@EnableScheduling
@SpringBootApplication
@EnableJpaRepositories("code.code.repositories.jpa")
@EnableElasticsearchRepositories("code.code.repositories.elastic")
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

}
