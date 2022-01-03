package ca.sheridancollege.newbytex.services.impl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.bson.BsonObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.transfer.MultipleFileDownload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.util.IOUtils;
import com.mongodb.client.gridfs.model.GridFSFile;

import ca.sheridancollege.newbytex.beans.Flyer;
import ca.sheridancollege.newbytex.beans.MusicTrack;
import ca.sheridancollege.newbytex.repositories.MusicTrackRepository;
import ca.sheridancollege.newbytex.services.MusicTrackService;
import lombok.RequiredArgsConstructor;

@Service("trackServiceImpl")
@RequiredArgsConstructor
public class MusicTrackServiceImpl implements MusicTrackService {

	private final MusicTrackRepository trackRepository;

	@Autowired
	AmazonS3 s3Client;

	@Value("${DO_SPACE_BUCKET}")
	private String doSpaceBucket;

	private String dir = "track/";
	private String ext = ".mp3";

	@Override
	public List<MusicTrack> getAllTracks() {
		return trackRepository.findAll();
	}

	@Override
	public Boolean deleteTrack(String id) {

		String filepath = dir + id + ext;
		s3Client.deleteObject(doSpaceBucket, filepath);

		MusicTrack track = trackRepository.findOneById(id);
		trackRepository.delete(track);

		return true;
	}

	@Override
	public String addTrack(String title, String artist, String releaseDate, MultipartFile multipartFile)
			throws IOException {

		MusicTrack newTrack = new MusicTrack();
		newTrack.setArtist(artist);
		newTrack.setTitle(title);
		newTrack.setReleaseDate(releaseDate);
		newTrack = trackRepository.save(newTrack);

		String id = newTrack.getId();
		String filepath = dir + id + ext;

		ObjectMetadata metadata = new ObjectMetadata();

		metadata.setContentLength(multipartFile.getInputStream().available());

		if (multipartFile.getContentType() != null && !"".equals(multipartFile.getContentType())) {
			metadata.setContentType(multipartFile.getContentType());
		}

		s3Client.putObject(new PutObjectRequest(doSpaceBucket, filepath, multipartFile.getInputStream(), metadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));

		return id;
	}

	@Override
	public StreamingResponseBody getTrack(String id) throws IllegalStateException, IOException {

		String filepath = dir + id + ext;
		S3Object s3Object = s3Client.getObject(doSpaceBucket, filepath);
		S3ObjectInputStream inputStream = s3Object.getObjectContent();
		MusicTrack track = trackRepository.findOneById(id);
		
		final StreamingResponseBody body = outputStream -> {
			int numberOfBytesToWrite = 0;
			byte[] data = new byte[1024];
			while((numberOfBytesToWrite = inputStream.read(data, 0, data.length)) != -1) {
				outputStream.write(data, 0, numberOfBytesToWrite);
			}
			inputStream.close();
			s3Object.close();
		};
		
	
		return body;
	}
}
