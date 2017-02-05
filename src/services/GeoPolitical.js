import Congress from './SunlightFoundationCongressApi';
import GoogleMaps from './GoogleMaps';


/**
 * Answers geopolitical questions.
 */
export default class GeoPolitical {

	/**
	 * Promises the districts in which an address belongs.
	 * @param {Object} params - Address information
	 * @return {Promise} Resolves to districts for address.
	 */
	static getDistrictsAtAddress(params) {
		const {street, zip, state, zip} = params;

		const req = GoogleMaps.getGeoFromAddress(street, zip, state, zip);

		return req.then((json) => {
			const {lat, lng} = json.results[0].geometry.location;

			return Congress.getGeoDistricts(lat, lng);
		});
	}
}
