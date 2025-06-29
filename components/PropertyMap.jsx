"use client";

import { useEffect, useRef, useState } from "react";
import "ol/ol.css"; // OpenLayers default styles
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Style, Icon } from "ol/style";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  const [ready, setReady] = useState(false);
  const mapRef = useRef(null); // map ref
  const mapContainerRef = useRef(null); // DOM element reference

  useEffect(() => {
    let cancelled = false;

    const fetchCoords = async () => {
      try {
        setLoading(true);
        setGeocodeError(false);

        const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
        const res = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(
            address
          )}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
        );
        const data = await res.json();

        if (!data.features?.length) {
          setGeocodeError(true);
          return;
        }

        const [lng, lat] = data.features[0].geometry.coordinates;

        // If a map instance already exists, clean it up
        if (mapRef.current) {
          mapRef.current.setTarget(null);
          mapRef.current = null;
        }

        // Wait for layout before initializing map
        waitForLayout(() => {
          if (cancelled || !mapContainerRef.current) return;

          // Initialize map
          const mapInstance = new Map({
            target: mapContainerRef.current,
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
                    src: "/images/pin.svg",
                    scale: 0.05,
                  }),
                }),
              }),
            ],
            view: new View({
              center: fromLonLat([lng, lat]),
              zoom: 12,
            }),
          });

          mapRef.current = mapInstance;
          window.mapRef = mapInstance;

          setTimeout(() => {
            mapInstance.updateSize();
          }, 100);
        });
      } catch (err) {
        console.error("Error fetching geocoding data:", err);
        setGeocodeError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCoords();

    // Cleanup map on unmount
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.setTarget(null);
        mapRef.current = null;
      }
    };
  }, [property]); // rerun when property changes

  // Detect that layout is ready before creating the map instance
  const waitForLayout = (cb, maxTries = 20) => {
    let tries = 0;
    const tryInit = () => {
      const el = mapContainerRef.current;
      if (el) {
        const { width, height } = el.getBoundingClientRect();
        if (width > 0 && height > 0) {
          cb();
          return;
        }
      }
      if (++tries < maxTries) {
        setTimeout(tryInit, 100);
      } else {
        console.warn("Map container never sized properly.");
      }
    };
    tryInit();
  };

  if (loading) return <Spinner />;

  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    <div
      // id="map"
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
};

export default PropertyMap;
