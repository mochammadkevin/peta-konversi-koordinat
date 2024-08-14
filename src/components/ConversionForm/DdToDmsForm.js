import React, { useState } from 'react';
import { ddToDms } from '../../utils/conversionUtils';

/**
 * A form component for converting decimal degrees to degrees, minutes, and seconds (DMS).
 *
 * @param {Object} props - The component props.
 * @param {function} props.onAddToMap - A callback function to be called when adding coordinates to the map.
 * @returns {JSX.Element} The rendered form component.
 */
const DdToDmsForm = ({ onAddToMap }) => {
    const [decimalLat, setDecimalLat] = useState('');
    const [decimalLon, setDecimalLon] = useState('');
    const [resultLat, setResultLat] = useState(null);
    const [resultLon, setResultLon] = useState(null);
    const [error, setError] = useState('');

    /**
     * Handles the form submission, converting decimal degrees to DMS and setting the result.
     *
     * @param {React.FormEvent} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFinite(decimalLat) || !isFinite(decimalLon)) {
            setError('Please enter valid decimal values for latitude and longitude.');
            return;
        }

        if (decimalLat < -90 || decimalLat > 90) {
            setError('Latitude must be between -90 and 90 degrees.');
            return;
        }

        if (decimalLon < -180 || decimalLon > 180) {
            setError('Longitude must be between -180 and 180 degrees.');
            return;
        }

        setError('');
        const dmsLat = ddToDms(decimalLat);
        const dmsLon = ddToDms(decimalLon);
        
        const formattedLat = {
            degrees: Math.abs(dmsLat.degrees),
            minutes: dmsLat.minutes,
            seconds: dmsLat.seconds,
            direction: decimalLat >= 0 ? 'N' : 'S'
        };

        const formattedLon = {
            degrees: Math.abs(dmsLon.degrees),
            minutes: dmsLon.minutes,
            seconds: dmsLon.seconds,
            direction: decimalLon >= 0 ? 'E' : 'W'
        };

        setResultLat(formattedLat);
        setResultLon(formattedLon);
    };

    /**
     * Handles adding the coordinates to the map by calling the provided callback function.
     */
    const handleAddToMap = () => {
        if (!isFinite(decimalLat) || !isFinite(decimalLon)) {
            setError('Please enter valid decimal values for latitude and longitude.');
            return;
        }

        setError('');
        onAddToMap({ lat: parseFloat(decimalLat), lon: parseFloat(decimalLon) });
    };

    return (
        <div className="text-white p-8 bg-gray-800 rounded-md shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center">
                    <div className="flex-1">
                        <label className="block text-lg font-semibold mb-2">Latitude</label>
                        <input
                            type="number"
                            value={decimalLat}
                            onChange={(e) => setDecimalLat(e.target.value)}
                            placeholder="Latitude"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                    </div>
                    <span className="ml-2 text-white">deg</span>
                </div>
                <div className="flex items-center">
                    <div className="flex-1">
                        <label className="block text-lg font-semibold mb-2">Longitude</label>
                        <input
                            type="number"
                            value={decimalLon}
                            onChange={(e) => setDecimalLon(e.target.value)}
                            placeholder="Longitude"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                    </div>
                    <span className="ml-2 text-white">deg</span>
                </div>
                <button type="submit" className="bg-green-600 px-6 py-3 rounded-md font-semibold text-lg">
                    Convert
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-600 text-white rounded-md">
                    <p>{error}</p>
                </div>
            )}

            {resultLat && resultLon && (
                <div className="mt-6 p-4 bg-gray-700 rounded-md">
                    <p className="text-md">Latitude: {resultLat.degrees}° {resultLat.minutes}' {resultLat.seconds}" {resultLat.direction}</p>
                    <p className="text-md">Longitude: {resultLon.degrees}° {resultLon.minutes}' {resultLon.seconds}" {resultLon.direction}</p>
                </div>
            )}

            <button
                onClick={handleAddToMap}
                className="mt-6 bg-green-600 px-6 py-3 rounded-md font-semibold text-lg"
            >
                Add To Map
            </button>
        </div>
    );
};

export default DdToDmsForm;
