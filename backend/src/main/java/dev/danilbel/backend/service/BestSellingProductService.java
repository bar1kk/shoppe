package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.product.view.BestSellingProductDto;

import java.util.List;

public interface BestSellingProductService {

    List<BestSellingProductDto> getBestSellingProducts();
}
