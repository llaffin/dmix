package ca.sheridancollege.newbytex.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FlyerRequestDTO {

	private String id;

	private String eventName;

	private String eventDate;

	private String filetype;
	
	private MultipartFile file;

}
