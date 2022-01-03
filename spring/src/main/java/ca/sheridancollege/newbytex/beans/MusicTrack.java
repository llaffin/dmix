package ca.sheridancollege.newbytex.beans;

import java.io.InputStream;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;

import lombok.Data;


@Data
@Document(collection="music tracks")
public class MusicTrack {
	
	@Id
	private String id;
	
	@NotNull
	@NotBlank(message = "fileName is mandatory")
	private String fileName;
	
	@NotNull
	@NotBlank(message = "Title is mandatory")
	private String title;
	
	@NotNull
	@NotBlank(message = "Artist is mandatory")
	private String artist;
	
	@NotNull
	@NotBlank(message = "Release Date is mandatory")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private String releaseDate;
	
	private InputStream stream;
	
}
