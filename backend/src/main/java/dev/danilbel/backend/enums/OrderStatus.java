package dev.danilbel.backend.enums;

public enum OrderStatus {
    PROCESSING("Processing");

    private final String name;

    OrderStatus(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
