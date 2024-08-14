import React, { useState } from 'react';
import { dmsToDd } from '../../utils/conversionUtils';

/**
 * A form component for converting degrees, minutes, and seconds (DMS) to decimal degrees.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onAddToMap - A callback function to be called when adding coordinates to the map.
 * @returns {JSX.Element} The rendered form component.
 */
const DmsToDdForm = ({ onAddToMap }) => {
    const [degreesLat, setDegreesLat] = useState('');
    const [minutesLat, setMinutesLat] = useState('');
    const [secondsLat, setSecondsLat] = useState('');
    const [degreesLon, setDegreesLon] = useState('');
    const [minutesLon, setMinutesLon] = useState('');
    const [secondsLon, setSecondsLon] = useState('');
    const [resultLat, setResultLat] = useState(null);
    const [resultLon, setResultLon] = useState(null);
    const [error, setError] = useState('');

    /**
     * Handles the form submission, converting DMS to decimal degrees and setting the result.
     *
     * @param {React.FormEvent} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const isLatValid = isFinite(degreesLat) && isFinite(minutesLat) && isFinite(secondsLat);
        const isLonValid = isFinite(degreesLon) && isFinite(minutesLon) && isFinite(secondsLon);

        if (!isLatValid || !isLonValid) {
            setError('Please enter valid values for degrees, minutes, and seconds.');
            return;
        }

        if (degreesLat < -90 || degreesLat > 90) {
            setError('Latitude degrees must be between -90 and 90.');
            return;
        }

        if (degreesLon < -180 || degreesLon > 180) {
            setError('Longitude degrees must be between -180 and 180.');
            return;
        }

        if (minutesLat < 0 || minutesLat >= 60 || minutesLon < 0 || minutesLon >= 60) {
            setError('Minutes must be between 0 and 59.');
            return;
        }

        if (secondsLat < 0 || secondsLat >= 60 || secondsLon < 0 || secondsLon >= 60) {
            setError('Seconds must be between 0 and 59.');
            return;
        }

        setError('');
        const ddLat = dmsToDd(degreesLat, minutesLat, secondsLat);
        const ddLon = dmsToDd(degreesLon, minutesLon, secondsLon);
        setResultLat(ddLat);
        setResultLon(ddLon);
    };

    /**
     * Handles adding the converted coordinates to the map by calling the provided callback function.
     */
    const handleAddToMap = () => {
        if (resultLat === null || resultLon === null) {
            setError('Please convert the coordinates before adding to the map.');
            return;
        }

        setError('');
        onAddToMap({ lat: parseFloat(resultLat), lon: parseFloat(resultLon) });
    };

    return (
        <div className="text-white p-8 bg-gray-800 rounded-md shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-semibold mb-2">Latitude</label>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="number"
                            value={degreesLat}
                            onChange={(e) => setDegreesLat(e.target.value)}
                            placeholder="Degrees"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                        <input
                            type="number"
                            value={minutesLat}
                            onChange={(e) => setMinutesLat(e.target.value)}
                            placeholder="Minutes"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                        <input
                            type="number"
                            value={secondsLat}
                            onChange={(e) => setSecondsLat(e.target.value)}
                            placeholder="Seconds"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2">Longitude</label>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="number"
                            value={degreesLon}
                            onChange={(e) => setDegreesLon(e.target.value)}
                            placeholder="Degrees"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                        <input
                            type="number"
                            value={minutesLon}
                            onChange={(e) => setMinutesLon(e.target.value)}
                            placeholder="Minutes"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                        <input
                            type="number"
                            value={secondsLon}
                            onChange={(e) => setSecondsLon(e.target.value)}
                            placeholder="Seconds"
                            className="w-full p-3 bg-gray-700 text-white rounded-md"
                        />
                    </div>
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
                    <p className="text-md">Latitude: {resultLat} deg</p>
                    <p className="text-md">Longitude: {resultLon} deg</p>
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

export default DmsToDdForm;
