package dev.danilbel.backend.controller;

import dev.danilbel.backend.service.ProductImageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Image")
public class ProductImageController {

    private static final String IMAGE = "api/v1/images/{imagePath}";

    ProductImageService imageService;

    @GetMapping(path = IMAGE, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable String imagePath) {

        byte[] image = imageService.getImage(imagePath);

        log.info("Image with path '{}' has been successfully read", imagePath);
        return ResponseEntity.ok(image);
    }
}
