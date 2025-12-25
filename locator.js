function locatorToLatLng(locator) {
    locator = locator.toUpperCase();

    const A = 'A'.charCodeAt(0);
    const a = 'a'.charCodeAt(0);
    const zero = '0'.charCodeAt(0);

    const lon = (locator.charCodeAt(0) - A) * 20 +
                (locator.charCodeAt(2) - zero) * 2 +
                (locator.charCodeAt(4) - a) / 12 - 180 + 1/12;

    const lat = (locator.charCodeAt(1) - A) * 10 +
                (locator.charCodeAt(3) - zero) +
                (locator.charCodeAt(5) - a) / 24 - 90 + 1/24;

    return { lat, lng: lon };
}
