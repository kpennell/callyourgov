import Ajax from './Ajax';
// import secret from 'secret.json';

const CLIENT = new Ajax({
	origin: 'https://congress.api.sunlightfoundation.com'
});


/**
 * Static REST Client for the Sunlight Congress API.
 * Use this to track U.S. Congress.
 *
 * All methods return Promises.
 *
 * @see https://sunlightlabs.github.io/congress/
 * @see http://tryit.sunlightfoundation.com/congress
 */
export default class SunlightFoundationCongressApi {


	/**
	 * Make GET request configured for the Congress API.
	 * @param {String} endpoint - URL pathname of given resource
	 *
	 * @param {Object} params - JS object that may be safely
	 * URL or JSON-encoded for transmission.
	 *
	 * @param {Boolean} [explain=falsey] - If true, Congress API will
	 * return JSON describing how the server interpreted the query.
	 *
	 * @return {Promise} Resolves to JSON payload
	 */
	static get(endpoint, params, explain) {

		const config = {
		};

		const payload = Object.assign({}, params, {
			apikey: 'b34a371adbb94d988029fec07141ed1d'
		});

		// Do not use playload.explain = !!explain.
		// We want to omit the 'explain' key entirely if the test is false.
		if (explain) {
			payload.explain = true;
		}

		return CLIENT.get(endpoint, payload, config);
	}


	/**
	 * Asks the Sunlight Foundation API if it is up and running.
	 * @return {Promise} Resolves to true/false. Rejects with network error.
	 */
	static isUp() {
		const OK = 200;

		return CLIENT.get('/').then((json) => json.status === OK);
	}


	/**
	 * Given a latitude and longitude,
	 * return all applicable congressional districts.
	 * @param {Number} latitude - Geo coordinate Latitude
	 * @param {Number} longitude - Geo coordinate Longitude
	 * @return {Promise} Resolves to array of districts
	 */
	static getGeoDistricts(latitude, longitude) {
		const endpoint = '/districts/locate';

		const query = {
			latitude,
			longitude
		};

		return SunlightFoundationCongressApi.
				get(endpoint, query).
				then((json) => json.results.map((record) => record.district));
	}

	static getPageCount(promise) {
		return promise.then((__, json) => {
			const {count, page: {per_page}} = json;

			return Math.floor(count / per_page);
		});
	}

	static getAmendments(query) {
		return SunlightFoundationCongressApi.
				get('/amendments', query).
				then((json) => json.results);
	}

	static getBills(query) {
		return SunlightFoundationCongressApi.
				get('/bills', query).
				then((json) => json.results);
	}

	static getCommittees(query) {
		return SunlightFoundationCongressApi.
				get('/committees', query).
				then((json) => json.results);
	}

	static getFloorUpdates(query) {
		return SunlightFoundationCongressApi.
				get('/floor_updates', query).
				then((json) => json.results);
	}

	static getHearings(query) {
		return SunlightFoundationCongressApi.
				get('/hearings', query).
				then((json) => json.results);
	}

	static getLegislatorsByZip(zip) {
		return SunlightFoundationCongressApi.
				get('/legislators/locate', {zip}).
				then((json) => json.results);
	}

	static getLegislatorsByGeo(latitude, longitude) {
		const payload = {
			latitude,
			longitude
		};

		return SunlightFoundationCongressApi.
				get('/legislators/locate', payload).
				then((json) => json.results);
	}

	static getLegislators(query) {
		return SunlightFoundationCongressApi.
				get('/legislators', query).
				then((json) => json.results);
	}

	static getNominations(query) {
		return SunlightFoundationCongressApi.
				get('/nominations', query).
				then((json) => json.results);
	}

	static searchBills(query) {
		return SunlightFoundationCongressApi.
				get('/bills/search', query).
				then((json) => json.results);
	}

	static getUpcomingBills(query) {
		return SunlightFoundationCongressApi.
				get('/upcoming_bills', query).
				then((json) => json.results);
	}

	static getVotes(query) {
		return SunlightFoundationCongressApi.
				get('/votes', query).
				then((json) => json.results);
	}
}
