package ca.sheridancollege.newbytex.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ca.sheridancollege.newbytex.beans.User;
@Repository
public interface UserRepository extends MongoRepository<User, String> {

	public User findByName(String name);
	
	public User findByEmail(String email);

	public User findByAddress(String address);

	public User findByPhonenumber(String phonenumber);

	public User findByActivationCode(String code);

	public User findByPasswordResetCode(String code);
	
}
