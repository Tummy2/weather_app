export function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(1);
}

export function kelvinToFahrenheit(kelvin) {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(1);
}

export function metersToMiles(ms) {
    return (ms * 2.23694).toFixed(1);
}