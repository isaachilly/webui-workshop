import {h} from '/js/src/index.js';
import {iconLaptop, iconHome} from '/js/src/icons.js'

const content = (model) => {

    const getStatusMessage = (remoteData) => remoteData.match({
        NotAsked: () => "Data has not been fetched from the server", 
        Loading: () => "Loading, please wait", 
        Success: () => "Data has been successfully loaded", 
        Failure: (error) => `An error has occurred: ${error.message}`, 
    });

    const getTableData = (remoteData) => remoteData.match({
        NotAsked: () => ({}), 
        Loading: () => ({}), 
        Success: (data) => data, 
        Failure: (error) => ({}), 
    });

    return h('div.m2', [
        h('p', 'Welcome to the about page of our application.'),
        h('div.flex.flex-column.w-33', [
            h('.btn.btn-primary.mv2' ,{
                oninit: () => {
                    console.log('This button takes you to the Home page');
                },
                onclick: () => {
                    model.router.go('?page=home');
                },
                id: 'home-button'
            }, [h('div.flex.flex-row.justify-center.items-center', [h('p', 'Home'), h('span.mh1', iconHome())])]),

            h('.btn.btn-primary.mv2' ,{
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