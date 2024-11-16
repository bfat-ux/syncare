import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
        });

        const google = await loader.load();
        const location = { lat: 9.0167117, lng: 7.5900915 };
        
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{ "color": "#1a3c42" }]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{ "color": "#242f3e" }]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#FF51BF" }]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [{ "color": "#38414e" }]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [{ "color": "#212a37" }]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{ "color": "#17262e" }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        new google.maps.Marker({
          position: location,
          map,
          title: "Kids' Care Hospital",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#FF51BF",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }
        });
      } catch (err) {
        console.error('Google Maps error details:', err);
        setError(`Failed to load Google Maps: ${err.message}`);
      }
    };

    initMap();
  }, []);

  if (error) {
    return (
      <div className="w-full h-[300px] md:h-[400px] rounded-lg bg-secondary flex items-center justify-center">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[200px] md:h-[250px] rounded-lg"
      style={{ 
        background: '#0C555F',
        border: '1px solid rgba(255, 81, 191, 0.2)'
      }}
    />
  );
};

export default GoogleMap;