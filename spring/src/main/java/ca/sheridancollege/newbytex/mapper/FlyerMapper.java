package ca.sheridancollege.newbytex.mapper;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import ca.sheridancollege.newbytex.beans.Flyer;
import ca.sheridancollege.newbytex.dto.FlyerRequestDTO;
import ca.sheridancollege.newbytex.dto.FlyerResponseDTO;
import ca.sheridancollege.newbytex.services.FlyerService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FlyerMapper {

	@Autowired
	private final ModelMapper flyerMapper;
	
	@Autowired
	private final FlyerService flyerService;

	public Flyer convertToEntity(FlyerRequestDTO flyerRequestDto) {
		return flyerMapper.map(flyerRequestDto, Flyer.class);
	}
	
	public Flyer convertToEntity(FlyerResponseDTO flyerResponseDto) {
		return flyerMapper.map(flyerResponseDto, Flyer.class);
	}

	public FlyerResponseDTO convertToResponseDto(Flyer flyer) {
		return flyerMapper.map(flyer, FlyerResponseDTO.class);
	}
	
	public FlyerResponseDTO convertToResponseDto(String id) {
		return flyerMapper.map(id, FlyerResponseDTO.class);
	}

	public StreamingResponseBody findflyer(FlyerRequestDTO flyerRequest) throws IllegalStateException, IOException {
		return flyerService.findFlyerById(convertToEntity(flyerRequest).getId());
	}
	
	public StreamingResponseBody findflyer(String id) throws IllegalStateException, IOException {
		return flyerService.findFlyerById(id);
	}

	public List<FlyerResponseDTO> getAllflyers() throws IllegalStateException, IOException {
		return flyerService.getAllFlyers().stream().map(this::convertToResponseDto).collect(Collectors.toList());
	}

	public Boolean deleteflyer(FlyerRequestDTO flyerRequest) {
		return flyerService.deleteFlyer(convertToEntity(flyerRequest).getId());
	}

	public FlyerResponseDTO createflyer(FlyerRequestDTO flyerRequest) throws IOException {
		Flyer flyer = convertToEntity(flyerRequest);
		return convertToResponseDto(flyerService.addFlyer(flyer.getEventName(), flyer.getEventDate(),
			flyerRequest.getFile()));
	}
}
