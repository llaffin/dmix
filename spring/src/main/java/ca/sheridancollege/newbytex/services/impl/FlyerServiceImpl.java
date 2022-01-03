package ca.sheridancollege.newbytex.services.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import ca.sheridancollege.newbytex.beans.Flyer;
import ca.sheridancollege.newbytex.repositories.FlyerRepository;
import ca.sheridancollege.newbytex.services.FlyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@Service("flyerServiceImpl")
@RequiredArgsConstructor
public class FlyerServiceImpl implements FlyerService {

	private final FlyerRepository flyerRepository;

	@Autowired
	AmazonS3 s3Client;

	@Value("${DO_SPACE_BUCKET}")
	private String doSpaceBucket;

	private String dir = "flyer/";
	private String ext = ".jpg";

	@Override
	public List<Flyer> getAllFlyers() throws IllegalStateException, IOException {

		List<Flyer> flyers = flyerRepository.findAll();

		for (Flyer flyer : flyers) {
			if (flyer != null) {
				flyer.setStream(findFlyerById(flyer.getId()));
			}
		}
		return flyers;
	}

	@Override
	public Boolean deleteFlyer(String id) {

		String filepath = dir + id + ext;
		s3Client.deleteObject(doSpaceBucket, filepath);

		Flyer flyer = flyerRepository.findOneById(id);
		flyerRepository.delete(flyer);
		return true;
	}

	@Override
	public String addFlyer(String eventName, String eventDate, MultipartFile multipartFile) throws IOException {

		Flyer flyer = new Flyer();
		flyer.setEventName(eventName);
		flyer.setEventDate(eventDate);
		flyer = flyerRepository.save(flyer);

		String id = flyer.getId();
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
	public StreamingResponseBody findFlyerById(String id) throws IllegalStateException, IOException {

		String filepath = dir + id + ext;
		S3Object s3Object = s3Client.getObject(doSpaceBucket, filepath);
		S3ObjectInputStream inputStream = s3Object.getObjectContent();
		Flyer flyer = flyerRepository.findOneById(id);
		
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
