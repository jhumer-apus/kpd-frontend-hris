import React, { useEffect, useState } from 'react';

export const useGeoLocation = () => {

    const [location, setLocation] = useState<any>({ latitude: null, longitude: null });
    const [error, setError] = useState<any>(null);

    const getCurrentLocation = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        setLocation(location);
                        resolve(location);
                    },
                    (error) => {
                        setError(error.message);
                        const location = {
                            latitude: null,
                            longitude: null,
                        };
                        setLocation(location);
                        resolve(location);
                    }
                );
            } else {
                const location = {
                    latitude: null,
                    longitude: null
                };
                setError("Geolocation is not supported by this browser.");
                setLocation(location);
                resolve(location);
            }
        });
    };

  return {
    location,
    getCurrentLocation
  }
};


