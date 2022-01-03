package ca.sheridancollege.newbytex.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MusicTrackRequestDTO {

	private String id;
	private String title;
	private String artist;
	private String releaseDate;
	private MultipartFile file;
}

