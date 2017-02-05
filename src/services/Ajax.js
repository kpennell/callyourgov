import qwest from 'qwest';

/* eslint-disable max-len, max-params */

/**
 * Qwest's underlying Promise implementation has problems.
 * This function wraps a reQwest in a Promise using the
 * implementation provided by Babel.
 *
 * @param {Promise} request - Promise on broken A+ implementation.
 * @return {Promise} Redundant promise using working A+ implementation
 */
function wrap(request) {
	return new Promise((resolve, reject) => {
		request.then((xhr, resp) => {
			resolve(resp
				? resp
				: JSON.parse(xhr.responseText));
		}).catch(reject);
	});
}

/**
 * AJAX client used to communicate with a variety of services.
 * Powered by Qwest.
 *
 * @see https://github.com/pyrsmk/qwest
 */
export default class Ajax {

	/**
	 * Configures client for future requests.
	 * @param {Object} config - Qwest configuration
	 */
	constructor(config) {
		const defaults = {
			origin: 'http://localhost',
			qwestcfg: {
				cache: true,
				responseType: 'json',
				headers: {
					'Cache-Control': ''
				}
			},
			legacyEncode: false,
			before: () => null
		};

		Object.assign(this, defaults, config);
	}


	/**
	 * @param {String} endpoint - Pathname to requested resource
	 * @param {Object} query - Object to encode as a query string in URL
	 * @return {String} Fully qualified URL for requests.
	 */
	resolve(endpoint, query) {
		let querystring = '';

		if (query) {
			const encode = (key) => {
				let dirty = encodeURIComponent(query[key]);

				if (this.legacyEncode) {
					dirty = dirty.replace(/%20/g, '+');
				}

				return `${key}=${dirty}`;
			};

			const params = Object.
							keys(query).
							map(encode).
							join('&');

			querystring = `?${params}`;
		}

		return `${this.origin}${endpoint}${querystring}`;
	}


	/**
	 * @param {String} endpoint - Pathname to requested resource
	 * @param {Object} query - Object to encode as a query string in URL
	 * @param {Object} config - Qwest config override.
	 * @return {Promise} XHR request status
	 */
	get(endpoint, query, config) {
		const opts = Object.assign({}, this.qwestcfg, config);

		return wrap(qwest.get(this.resolve(endpoint, query), null, opts, this.before));
	}


	/**
	 * @param {String} endpoint - Pathname to requested resource
	 * @param {Object} data - Data to send with request
	 * @param {Object} query - Object to encode as a query string in URL
	 * @param {Object} config - Qwest config override.
	 * @return {Promise} XHR request status
	 */
	post(endpoint, data, query, config) {
		const opts = Object.assign({}, this.qwestcfg, config);

		return wrap(qwest.post(this.resolve(endpoint, query), data, opts, this.before));
	}


	/**
	 * @param {String} endpoint - Pathname to requested resource
	 * @param {Object} data - Data to send with request
	 * @param {Object} query - Object to encode as a query string in URL
	 * @param {Object} config - Qwest config override.
	 * @return {Promise} XHR request status
	 */
	put(endpoint, data, query, config) {
		const opts = Object.assign({}, this.qwestcfg, config);

		return wrap(qwest.put(this.resolve(endpoint, query), data, opts, this.before));
	}


	/**
	 * @param {String} endpoint - Pathname to requested resource
	 * @param {Object} data - Data to send with request
	 * @param {Object} query - Object to encode as a query string in URL
	 * @param {Object} config - Qwest config override.
	 * @return {Promise} XHR request status
	 */
	delete(endpoint, data, query, config) {
		const opts = Object.assign({}, this.qwestcfg, config);

		return wrap(qwest.delete(this.resolve(endpoint, query), data, opts, this.before));
	}
}
