import axios from 'axios';

class TransportController {

	constructor() {
		this.transport = axios.create();

		this.transport.interceptors.request.use(this.onFulfilledRequest, this.onRejectedRequest);
		this.transport.interceptors.response.use(this.onFulfilledResponse, this.onRejectedResponse);

		return (this.transport);
	}
	
	onFulfilledRequest(request) {
		// return (request);
	}

	onRejectedRequest(reason) {

	}

	onFulfilledResponse(response) {

	}

	onRejectedResponse(reason) {

	}

};

export default new TransportController();