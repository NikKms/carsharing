export const extractCityAndCountry = (address) => {
    const addressArray = address?.split(', ');
    const city = addressArray[1] || '';
    const country = addressArray[2] || '';

    return { city, country };
};