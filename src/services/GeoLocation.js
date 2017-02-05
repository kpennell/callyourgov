/**
 * Returns the user's location on the Earth using a Navigator API.
 */
export default class GeoLocation {

	/**
	 * Initializes GeoLocation with a Navigator interface
	 * @param {Object} navigatorApi - Implementation of Navigator interface.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator
	 */
	constructor(navigatorApi) {
		this.nav = navigatorApi;
	}


	/**
	 * @type {Boolean} If geolocation is supported by the Navigator interface.
	 */
	get supported() {
		return this.nav && 'geolocation' in this.nav;
	}


	/**
	 * @param {Boolean} highAccuracy - True to sacrifice speed for accuracy.
	 * @return {Promise} Resolves to a Position object
	 *                   Rejects with implementation specific error.
	 * @throws {Error} When GeoLocation is unsupported by the Navigator.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Position
	 */
	getCoordinates(highAccuracy) {
		if (!this.supported) {
			throw new Error('GeoLocation is not supported.');
		}

		const opts = {
			enableHighAccuracy: Boolean(highAccuracy),
			timeout: 5000,
			maximumAge: 0
		};

		return new Promise((resolve, reject) => {
			this.nav.geolocation.getCurrentPosition(resolve, reject, opts);
		});
	}
}
