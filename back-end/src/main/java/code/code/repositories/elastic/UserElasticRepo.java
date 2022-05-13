package code.code.repositories.elastic;

import code.code.entities.User;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@ConditionalOnProperty(value = "elastic.enabled",matchIfMissing = false)
public interface UserElasticRepo extends ElasticsearchRepository<User, String> {
    List<User> findByEmail(String text);
}

