package ca.sheridancollege.newbytex.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class SpaceConfiguration {
	
	@Value("${DO_SPACE_KEY}")
	private String doSpaceKey;
	
	@Value("${DO_SPACE_SECRET}")
	private String doSpaceSecret;
	
	@Value("${DO_SPACE_ENDPOINT}")
	private String doSpaceEndPoint;
	
	@Value("${DO_SPACE_REGION}")
	private String doSpaceRegion;
	
	@Bean
	public AmazonS3 getS3() {
		BasicAWSCredentials creds = new BasicAWSCredentials(doSpaceKey, doSpaceSecret);
		return AmazonS3ClientBuilder.standard()
				.withEndpointConfiguration(new EndpointConfiguration(doSpaceEndPoint, doSpaceRegion))
				.withCredentials(new AWSStaticCredentialsProvider(creds)).build();
	}
}
