/**
 * Converts degrees, minutes, and seconds (DMS) to decimal degrees (DD).
 *
 * @param {number} degrees - The degrees part of the DMS coordinate.
 * @param {number} minutes - The minutes part of the DMS coordinate.
 * @param {number} seconds - The seconds part of the DMS coordinate.
 * @returns {number} The decimal degrees representation of the input DMS coordinate.
 */
export function dmsToDd(degrees, minutes, seconds) {
    return degrees + (minutes / 60) + (seconds / 3600);
}

/**
 * Converts decimal degrees (DD) to degrees, minutes, and seconds (DMS).
 *
 * @param {number} decimal - The decimal degrees coordinate.
 * @returns {Object} An object representing the DMS coordinates, with properties for degrees, minutes, and seconds.
 */
export function ddToDms(decimal) {
    const degrees = Math.floor(decimal);
    const minutesNotTruncated = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = (minutesNotTruncated - minutes) * 60;
    return { degrees, minutes, seconds };
}
