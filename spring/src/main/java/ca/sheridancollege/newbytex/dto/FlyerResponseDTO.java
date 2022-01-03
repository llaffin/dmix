package ca.sheridancollege.newbytex.dto;

import java.io.InputStream;
import java.time.LocalDate;

import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import lombok.Data;

@Data
public class FlyerResponseDTO {

	private String id;

	private String eventName;

	private String eventDate;

	private String filetype;
	
	public StreamingResponseBody stream;

}
