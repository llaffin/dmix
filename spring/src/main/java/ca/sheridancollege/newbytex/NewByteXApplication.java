package ca.sheridancollege.newbytex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import ca.sheridancollege.newbytex.repositories.MusicTrackRepository;
import ca.sheridancollege.newbytex.repositories.UserRepository;

@SpringBootApplication

public class NewByteXApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewByteXApplication.class, args);
	}

}
