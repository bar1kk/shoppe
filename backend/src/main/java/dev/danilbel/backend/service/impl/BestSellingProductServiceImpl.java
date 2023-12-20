package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.product.view.BestSellingProductDto;
import dev.danilbel.backend.entity.view.BestSellingProductEntity;
import dev.danilbel.backend.mapper.BestSellingProductMapper;
import dev.danilbel.backend.repository.BestSellingProductRepository;
import dev.danilbel.backend.service.BestSellingProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class BestSellingProductServiceImpl implements BestSellingProductService {

    BestSellingProductRepository bestSellingProductRepository;

    BestSellingProductMapper bestSellingProductMapper;

    @Override
    @Transactional(readOnly = true)
    public List<BestSellingProductDto> getBestSellingProducts() {

        Stream<BestSellingProductEntity> bestSellingProductEntityStream = bestSellingProductRepository.streamAllBy();

        List<BestSellingProductDto> bestSellingProductDtoList = bestSellingProductEntityStream
                .map(bestSellingProductMapper::map)
                .toList();

        log.info("IN BestSellingProductServiceImpl.getBestSellingProducts - {} best selling products found", bestSellingProductDtoList.size());
        return bestSellingProductDtoList;
    }
}
