package ca.sheridancollege.newbytex.beans;

import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.mongodb.core.mapping.Document;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
@Document(collection = "user")
public class User {

	@Id
	private String id;

	@NotNull
	@NotBlank(message = "Name is mandatory")
	private String name;

	@NotNull
	@Column(unique = true)
	@NotBlank(message = "Email is mandatory")
	@Email
	private String email;

	@NotNull
	@Size(min = 8)
	private String password;

	private String address;
	private String phonenumber;
	private String activationCode;
	private String passwordResetCode;
	private boolean active;

	@Enumerated(EnumType.STRING)
	private AuthProvider provider;

	@ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
	@Enumerated(EnumType.STRING)
	private Set<Role> roles;

}
