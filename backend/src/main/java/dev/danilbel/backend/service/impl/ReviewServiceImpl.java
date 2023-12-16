package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.review.CreateReviewDto;
import dev.danilbel.backend.dto.review.ReviewDto;
import dev.danilbel.backend.entity.ProductEntity;
import dev.danilbel.backend.entity.ReviewEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.exception.AccessDeniedException;
import dev.danilbel.backend.mapper.ReviewMapper;
import dev.danilbel.backend.repository.ReviewRepository;
import dev.danilbel.backend.service.ProductService;
import dev.danilbel.backend.service.ReviewService;
import dev.danilbel.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ReviewServiceImpl implements ReviewService {

    ReviewRepository reviewRepository;

    ReviewMapper reviewMapper;

    ProductService productService;

    UserService userService;

    @Override
    public ReviewDto createReviewByUserEmail(String userEmail, CreateReviewDto createReviewDto) {

        UserEntity userEntity = userService.getUserEntityByEmail(userEmail);

        if (userEntity.getFirstName() == null || userEntity.getLastName() == null) {
            throw new AccessDeniedException(
                    String.format("User with email '%s' has no access to create review because he has no first name or last name", userEmail)
            );
        }

        ProductEntity productEntity = productService.getProductEntityById(createReviewDto.getProductId());

        ReviewEntity reviewEntity = ReviewEntity.builder()
                .rating(createReviewDto.getRating())
                .description(createReviewDto.getDescription())
                .product(productEntity)
                .user(userEntity)
                .build();

        reviewEntity = reviewRepository.save(reviewEntity);

        log.info("IN ReviewServiceImpl.createReviewByProductIdAndUserEmail - review: {} created", reviewEntity);

        return reviewMapper.map(reviewEntity);
    }
}
