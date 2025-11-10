import {Observable} from '/js/src/index.js';

class Home extends Observable {
    constructor() {
        super();
        this.userName = '';
    }

    getUserName() {
        return this.userName;
    }

    setUserName(name) {
        this.userName = name;
        this.notify();
    }

}

export default Home;