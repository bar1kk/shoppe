package dev.danilbel.backend.dto.review;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.danilbel.backend.dto.user.UserSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ReviewDto {

    String id;

    Integer rating;

    String description;

    @JsonProperty("created_at")
    String createdAt;

    UserSummaryDto user;
}
