package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.review.ReviewDto;
import dev.danilbel.backend.entity.ReviewEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ReviewMapper {

    ReviewDto map(ReviewEntity reviewEntity);
}
