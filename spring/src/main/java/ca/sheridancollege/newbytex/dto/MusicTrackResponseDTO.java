package ca.sheridancollege.newbytex.dto;


import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MusicTrackResponseDTO {
	private String id;
	private String title;
	private String artist;
	private String releaseDate;
	private InputStream stream;
}

