import Ajax from './Ajax';
import secret from 'secret.json';

const CLIENT = new Ajax({
	origin: 'https://maps.googleapis.com',
	legacyEncode: true
});

export default class GoogleMaps {

	/**
	 * Promises geolocation information for a given
	 * qualified street address.
	 * @param {Object} params - Address information
	 * @return {Promise} Resolves to latitude and longitude for street address
	 */
	static getGeoFromAddress(params) {
		const {street, zip, state, zip} = params;
		const endpoint = '/maps/api/geocode/json';
		const address = `${street}, ${zip}, ${state}, ${zip}`;
		const query = {
			address,
			key: secret.apikeys.googlemaps
		};

		return CLIENT.get(endpoint, query);
	}
}
