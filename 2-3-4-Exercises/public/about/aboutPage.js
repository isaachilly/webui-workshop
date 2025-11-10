import {h, fetchClient, RemoteData} from '/js/src/index.js';
import {iconLaptop, iconHome} from '/js/src/icons.js'

const content = (model) => {

    const getStatusMessage = (remoteData) => remoteData.match({
        NotAsked: () => "Data has not been fetched from the server", // Display a message to the user saying that data has not been fetched
        Loading: () => "Loading, please wait", // A request has probably been sent to the server but we did not receive any response yet
        Success: () => "Data has been successfully loaded", // The server response has been stored in the remote data payload, and it is passed as parameter to the Success callback
        Failure: (error) => `An error has occurred: ${error.message}`, // An error has occurred, displays its message
    });

    const getTableData = (remoteData) => remoteData.match({
        NotAsked: () => ({}), // No data to display
        Loading: () => ({}), // No data to display
        Success: (data) => data, // The server response has been stored in the remote data payload, and it is passed as parameter to the Success callback
        Failure: (error) => ({}), // No data to display
    });

    return h('div.m2', [
        h('p', 'Welcome to the about page of our application.'),
        h('div.flex.flex-column.w-33', [
            h('.btn.btn-primary.mv2' ,{
                // on load print to console its purpose
                oninit: () => {
                    console.log('This button takes you to the Home page');
                },
                onclick: () => {
                    model.router.go('?page=home');
                },
                id: 'home-button'
            }, [h('div.flex.flex-row.justify-center.items-center', [h('p', 'Home'), h('span.mh1', iconHome())])]),
            h('.btn.btn-primary.mv2' ,{
                // on load print to console its purpose
                oninit: () => {
                    console.log('This button tells you application data');
                },
                onclick: () => {
                    model.about.requestData()
                    
                },
                id: 'request-application-data-button'
            }, [h('div.flex.flex-row.justify-center.items-center', [h('p', 'Request Application Data'), h('span.mh1', iconLaptop())])]),
        ]),
        h('p.mt2', {id: 'application-data-status-display'} ,`Your app data status: ${getStatusMessage(model.about.getDetails())}`),
        h('table.table', [
            h('thead', [
                h('tr', [
                    h('th', 'Property'),
                    h('th', 'Value'),
                ])
            ]),
            h('tbody', [

                Object.entries(getTableData(model.about.getDetails())).map(([key, value]) =>
                    h('tr', [
                        h('td', key),
                        h('td', value),
                    ])
                )
            ])
        ]),
    ]);
};

export default content;