package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.review.CreateReviewDto;
import dev.danilbel.backend.dto.review.ReviewDto;

public interface ReviewService {

    ReviewDto createReviewByUserEmail(String userEmail, CreateReviewDto createReviewDto);
}
