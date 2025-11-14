import {Observable, RemoteData, fetchClient} from '/js/src/index.js';

class About extends Observable {
    constructor() {
        super();
        this.details = RemoteData.NotAsked();
        this.requestedTimes = 0;
    }

    async requestData() {
        this._setDetails(RemoteData.Loading());
        try {
            const response = await fetchClient('/api/applicationData');
            const data = await response.json();
            this._setDetails(RemoteData.Success(data));
        } catch (error) {
            this._setDetails(RemoteData.Failure(error));
            console.error(`Error fetching application data: ${error.message}`);
        }
        
        this.requestedTimes++;
        return this.details;
    }

    getDetails() {
        return this.details;
    }

    _setDetails(details) {
        this.details = details;
        this.notify();
    }
}

export default About;