package ca.sheridancollege.newbytex.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.amazonaws.services.s3.model.S3ObjectInputStream;

import ca.sheridancollege.newbytex.dto.FlyerRequestDTO;
import ca.sheridancollege.newbytex.dto.FlyerResponseDTO;
import ca.sheridancollege.newbytex.mapper.FlyerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flyer")
public class FlyerController {

	private final FlyerMapper flyerMapper;

	@GetMapping("/getAllFlyers")
	public ResponseEntity<List<FlyerResponseDTO>> getAllFlyers() throws IllegalStateException, IOException {
		return ResponseEntity.ok(flyerMapper.getAllflyers());
	}

	@PostMapping("/getFlyer")
	public ResponseEntity<StreamingResponseBody> getFlyer(@Valid @RequestBody FlyerRequestDTO flyerRequest,
			BindingResult bindingResult) throws IOException {
		return ResponseEntity.ok(flyerMapper.findflyer(flyerRequest));
	}

	@PostMapping("/deleteFlyer")
	public Boolean deleteFlyer(@Valid @RequestBody FlyerRequestDTO flyerRequest, Authentication authentication) {
		if (authentication != null
				&& authentication.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ADMIN"))) {
			return flyerMapper.deleteflyer(flyerRequest);
		} else {
			return false;
		}
	}

	@PostMapping(value = "/createFlyer", consumes = { "multipart/form-data" })
	public ResponseEntity<FlyerResponseDTO> addFlyer(@Valid @ModelAttribute FlyerRequestDTO flyerRequest,
			Authentication authentication) throws IOException {
		if (authentication != null
				&& authentication.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ADMIN"))) {
			return ResponseEntity.ok(flyerMapper.createflyer(flyerRequest));
		} else {
			return ResponseEntity.ok(new FlyerResponseDTO());
		}
	}

	@GetMapping("/streamFlyer/{id}")
	public ResponseEntity<StreamingResponseBody> streamFlyer(@Valid @PathVariable String id, HttpServletResponse response) throws Exception {
		StreamingResponseBody flyer = flyerMapper.findflyer(id);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		return ResponseEntity.ok(flyer);
	}
}
