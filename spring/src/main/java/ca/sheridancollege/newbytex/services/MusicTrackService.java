package ca.sheridancollege.newbytex.services;

import java.io.IOException;
import java.util.List;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import ca.sheridancollege.newbytex.beans.MusicTrack;

public interface MusicTrackService {

	List<MusicTrack> getAllTracks();

	Boolean deleteTrack(String id);

	StreamingResponseBody getTrack(String id) throws IllegalStateException, IOException;

	String addTrack(String title, String artist, String releaseDate, MultipartFile multipartFile) throws IOException;
}
