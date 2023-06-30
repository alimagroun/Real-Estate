package com.magroun.realestate.projection;

import java.util.List;

public interface PropertyProjection {
    String getName();
    List<PhotoProjection> getPhotos();
}
