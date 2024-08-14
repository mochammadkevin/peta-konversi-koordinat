import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import Overlay from 'ol/Overlay';
import './MapComponent.css';

/**
 * A component that renders an interactive map with the ability to place markers and display popups.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.coordinates - Coordinates to display a marker on the map.
 * @param {function} props.onMarkerClick - Callback function invoked when a marker is clicked.
 * @param {function} props.onNewMarker - Callback function invoked when a new marker is added.
 * @returns {JSX.Element} The rendered map component.
 */
const MapComponent = ({ coordinates, onMarkerClick, onNewMarker }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      const initialMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });

      // Initialize the vector layer for markers
      const initialVectorLayer = new VectorLayer({
        source: new VectorSource(),
      });
      initialMap.addLayer(initialVectorLayer);
      setVectorLayer(initialVectorLayer);

      // Create and set the popup overlay
      const overlay = new Overlay({
        element: document.getElementById('popup'),
        positioning: 'bottom-center',
        stopEvent: false,
      });
      initialMap.addOverlay(overlay);
      setPopup(overlay);

      mapRef.current = initialMap;
      setMap(initialMap);
    }
  }, []);

  useEffect(() => {
    if (map && vectorLayer && coordinates) {
      // Create a new feature for the provided coordinates
      const feature = new Feature({
        geometry: new Point(fromLonLat([coordinates.lon, coordinates.lat])),
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          }),
        })
      );

      // Update the vector layer with the new feature
      const source = vectorLayer.getSource();
      source.clear();
      source.addFeature(feature);

      // Center the map on the coordinates
      map.getView().setCenter(fromLonLat([coordinates.lon, coordinates.lat]));
      map.getView().setZoom(8);
    }
  }, [map, vectorLayer, coordinates]);

  /**
   * Handles map click events, adding markers or invoking callbacks as necessary.
   *
   * @param {ol.MapBrowserEvent} event - The map click event.
   */
  const handleMapClick = (event) => {
    const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
    if (feature) {
      const coordinates = toLonLat(feature.getGeometry().getCoordinates());
      onMarkerClick({ lon: coordinates[0], lat: coordinates[1] });
    } else {
      const clickCoords = map.getEventCoordinate(event.originalEvent);
      const lonLat = toLonLat(clickCoords);

      // Add a new marker at the clicked location
      const newMarker = new Feature({
        geometry: new Point(clickCoords),
      });

      newMarker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }),
        })
      );

      const source = vectorLayer.getSource();
      source.addFeature(newMarker);

      onNewMarker({ lon: lonLat[0], lat: lonLat[1] });
    }
  };

  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick);

      // Pointer move event to show popup on hover
      map.on('pointermove', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
        if (feature) {
          const coordinates = toLonLat(feature.getGeometry().getCoordinates());
          const [lon, lat] = coordinates;
          const popupElement = popup.getElement();
          popupElement.innerHTML = `Longitude: ${lon.toFixed(6)}, Latitude: ${lat.toFixed(6)}`;
          popup.setPosition(event.coordinate);
        } else {
          popup.setPosition(undefined);
        }
      });

      return () => {
        map.off('click', handleMapClick);
        map.off('pointermove');
      };
    }
  }, [map, popup]);

  return (
    <>
      <div id="map" className="w-full h-screen" />
      <div id="popup" className="ol-popup" />
    </>
  );
};

export default MapComponent;
