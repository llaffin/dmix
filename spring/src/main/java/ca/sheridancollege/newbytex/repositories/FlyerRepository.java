package ca.sheridancollege.newbytex.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ca.sheridancollege.newbytex.beans.Flyer;

@Repository
public interface FlyerRepository extends MongoRepository<Flyer, String>{
	
	public Flyer findOneById(String id);
	List<Flyer> findAll();
}