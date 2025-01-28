'use client';

import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css'; // OpenLayers default styles
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Style, Icon } from 'ol/style';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        // Fetch coordinates using MapTiler Geocoding API
        const res = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(
            `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
          )}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
        );

        const data = await res.json();

        // Validate response
        if (!data.features || data.features.length === 0) {
          setGeocodeError(true);
          return;
        }
        // setMap(null);
        const [lng, lat] = data.features[0].geometry.coordinates;

        // If a map instance already exists, clean it up
        if (map) {
          map.setTarget(null);
        }

        // Initialize map
        const mapInstance = new Map({
          target: 'map',
          layers: [
            // Base Tile Layer from MapTiler
            new TileLayer({
              source: new XYZ({
                url: `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`,
                attributions:
                  '© <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> © OpenStreetMap contributors',
              }),
            }),
            // Marker Layer
            new VectorLayer({
              source: new VectorSource({
                features: [
                  new Feature({
                    geometry: new Point(fromLonLat([lng, lat])),
                  }),
                ],
              }),
              style: new Style({
                image: new Icon({
                  src: '/images/pin.svg', // Replace with your marker icon path
                  scale: 0.05, // Scale the icon
                }),
              }),
            }),
          ],
          view: new View({
            center: fromLonLat([lng, lat]),
            zoom: 12,
          }),
        });

        setMap(mapInstance);
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();

    // Cleanup map on unmount
    return () => {
      if (map) {
        map.setTarget(null);
      }
    };
  }, [property]);

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '500px',
      }}
    />
  );
};

export default PropertyMap;