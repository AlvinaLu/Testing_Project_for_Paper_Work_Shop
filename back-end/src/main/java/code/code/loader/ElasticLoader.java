package code.code.loader;

import code.code.entities.User;
import code.code.repositories.jpa.UserRepository;
import code.code.repositories.elastic.UserElasticRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
@ConditionalOnProperty(value = "elastic.enabled",matchIfMissing = false)
public class ElasticLoader {

    private final ElasticsearchOperations operations;
    @Autowired
    private final UserRepository userRepository;

    private final UserElasticRepo clientElasticRepo;

    @Autowired
    public ElasticLoader(ElasticsearchOperations operations, UserRepository userRepository, UserElasticRepo userElasticRepo) {
        this.operations = operations;
        this.userRepository = userRepository;
        this.clientElasticRepo = userElasticRepo;
    }

    @PostConstruct
    @Transactional
    public void loadAll() {
        operations.indexOps(User.class).create();
        List<User> list = userRepository.findAll();
        clientElasticRepo.saveAll(list);
    }
}
