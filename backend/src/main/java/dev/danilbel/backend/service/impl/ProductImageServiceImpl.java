package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.service.ProductImageService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Slf4j
public class ProductImageServiceImpl implements ProductImageService {

    @Value("${app.image.bucket}")
    private String bucket;

    @Override
    @SneakyThrows
    public byte[] getImage(String imagePath) {

        Path fullImagePath = Path.of(bucket, imagePath);

        if (Files.exists(fullImagePath)) {

            byte[] image = Files.readAllBytes(fullImagePath);
            log.info("Image with path '{}' has been successfully read", imagePath);
            return image;
        } else {

            log.error("Image with path '{}' not found", imagePath);
            throw new NotFoundException(
                    String.format("Image with path '%s' not found", imagePath)
            );
        }
    }
}
