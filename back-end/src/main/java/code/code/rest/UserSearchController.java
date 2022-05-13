package code.code.rest;

import code.code.entities.User;
import code.code.repositories.elastic.UserElasticRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@ConditionalOnProperty(value = "elastic.enabled",matchIfMissing = false)
public class UserSearchController {

    private final UserElasticRepo userElasticRepo;

    @Autowired
    public UserSearchController(UserElasticRepo userElasticRepo){this.userElasticRepo=userElasticRepo;}

    @GetMapping(value = "/email/{text}")
    public List<User> searchEmail(@PathVariable final String text){
        return userElasticRepo.findByEmail(text);
    }
}
