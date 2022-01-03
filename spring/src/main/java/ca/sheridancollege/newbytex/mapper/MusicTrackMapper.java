package ca.sheridancollege.newbytex.mapper;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import ca.sheridancollege.newbytex.beans.MusicTrack;
import ca.sheridancollege.newbytex.dto.MusicTrackRequestDTO;
import ca.sheridancollege.newbytex.dto.MusicTrackResponseDTO;
import ca.sheridancollege.newbytex.services.MusicTrackService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MusicTrackMapper {

	@Autowired
	private final ModelMapper trackMapper;
	
	@Autowired
	private final MusicTrackService trackService;

	public MusicTrack convertToEntity(MusicTrackRequestDTO trackRequestDto) {
		return trackMapper.map(trackRequestDto, MusicTrack.class);
	}
	
	public MusicTrack convertToEntity(MusicTrackResponseDTO trackResponseDto) {
		return trackMapper.map(trackResponseDto, MusicTrack.class);
	}

	public MusicTrackResponseDTO convertToResponseDto(MusicTrack track) {
		return trackMapper.map(track, MusicTrackResponseDTO.class);
	}
	
	public MusicTrackResponseDTO convertToResponseDto(String id) {
		return trackMapper.map(id, MusicTrackResponseDTO.class);
	}
	
	public MusicTrackResponseDTO createTrack(MusicTrackRequestDTO trackRequest) throws IOException {
		MusicTrack track = convertToEntity(trackRequest);
		return convertToResponseDto(trackService.addTrack(track.getArtist(), track.getTitle(),
				track.getReleaseDate(), trackRequest.getFile()));
	}

	public StreamingResponseBody findTrack(MusicTrackRequestDTO trackRequest) throws IllegalStateException, IOException {
		return trackService.getTrack(convertToEntity(trackRequest).getId());
	}
	
	public StreamingResponseBody findTrack(String id) throws IllegalStateException, IOException {
		return trackService.getTrack(id);
	}

	public List<MusicTrackResponseDTO> getAllTracks() {
		return trackService.getAllTracks().stream().map(this::convertToResponseDto).collect(Collectors.toList());
	}

	public Boolean deleteTrack(MusicTrackRequestDTO trackRequest) {
		return trackService.deleteTrack(convertToEntity(trackRequest).getId());
	}
}
