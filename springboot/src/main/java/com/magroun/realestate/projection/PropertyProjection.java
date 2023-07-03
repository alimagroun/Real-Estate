package com.magroun.realestate.projection;

public interface PropertyProjection {
    Long getId();
    String getName();
    Float getPrice();
    int getBedrooms();
    int getBathrooms();
    int getSize();
    String getFilePath();
    String getCityName();
   String getStateName();
}
