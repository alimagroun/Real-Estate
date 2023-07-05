package com.magroun.realestate.projection;

public interface PropertyProjection {
    Long getId();
    String getName();
    String getStatus();
    Float getPrice();
    int getBedrooms();
    int getBathrooms();
    int getSize();
    String getFilePath();
    String getCityName();
   String getStateName();
}
