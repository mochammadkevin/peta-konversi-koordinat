import React, { useState } from 'react';
import MapComponent from './components/Map/MapComponent';
import DmsToDdForm from './components/ConversionForm/DmsToDdForm';
import DdToDmsForm from './components/ConversionForm/DdToDmsForm';

/**
 * Main application component.
 *
 * @component
 */
const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useState('DMS to DD');
    const [coordinates, setCoordinates] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    /**
     * Handles adding coordinates to the map.
     *
     * @param {Object} coords - The coordinates to add.
     * @param {number} coords.lat - Latitude.
     * @param {number} coords.lon - Longitude.
     */
    const handleAddToMap = (coords) => {
        setCoordinates(coords);
        setShowModal(false);
    };

    /**
     * Handles marker click on the map.
     *
     * @param {Object} coords - The coordinates of the clicked marker.
     * @param {number} coords.lat - Latitude.
     * @param {number} coords.lon - Longitude.
     */
    const handleMarkerClick = (coords) => {
        setSelectedMarker(coords);
        setCoordinates(coords);
        setShowModal(true);
    };

    /**
     * Handles adding a new marker to the map.
     *
     * @param {Object} coords - The coordinates of the new marker.
     * @param {number} coords.lat - Latitude.
     * @param {number} coords.lon - Longitude.
     */
    const handleNewMarker = (coords) => {
        setCoordinates(coords);
    };

    return (
        <div className="App bg-gray-800 min-h-screen flex flex-col justify-center items-center">
            <MapComponent coordinates={coordinates} onMarkerClick={handleMarkerClick} onNewMarker={handleNewMarker} />
            <button
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowModal(true)}
            >
                Convert Coordinates
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-gray-700 p-8 rounded-xl shadow-lg">
                        <button 
                            onClick={() => setShowModal(false)} 
                            className="text-white absolute top-5 right-5 bg-red-600 hover:bg-red-700 rounded-xl px-3 py-1"
                        >
                            Close
                        </button>
                        <div className="flex space-x-4 mt-4">
                            <button 
                                onClick={() => setTab('DMS to DD')} 
                                className={`px-4 py-2 rounded-md ${tab === 'DMS to DD' ? 'bg-green-600' : 'bg-gray-700'} text-white font-semibold transition duration-300 ease-in-out`}
                            >
                                DMS to DD
                            </button>
                            <button 
                                onClick={() => setTab('DD to DMS')} 
                                className={`px-4 py-2 rounded-md ${tab === 'DD to DMS' ? 'bg-green-600' : 'bg-gray-700'} text-white font-semibold transition duration-300 ease-in-out`}
                            >
                                DD to DMS
                            </button>
                        </div>
                        <div className="mt-4">
                            {tab === 'DMS to DD' ? 
                                <DmsToDdForm onAddToMap={handleAddToMap} /> : 
                                <DdToDmsForm onAddToMap={handleAddToMap} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
