import {h} from '/js/src/index.js';
import {info, iconPerson} from '/js/src/icons.js'

const content = (model) => {

    return h('div.m2', [
        h('p', 'Welcome to the home page of our application.'),
        h('div.flex.flex-column.w-33', [
            h('.btn.btn-primary.mv2', {
                oninit: () => {
                    console.log('This button takes you to the About page');
                },
                onclick: () => {
                    model.router.go('?page=about');
                },
                id: 'about-button'
            }, [h('div.flex.flex-row.justify-center.items-center', [h('p', 'About'), h('span.mh1', info())])]),
            
            h('.btn.btn-primary.mv2', {
                oninit: () => {
                    console.log('This button tells you your username');
                },
                onclick: () => {
                    model.home.setUserName(model.session.username);
                }
                , id: 'get-username-button'
            }, [h('div.flex.flex-row.justify-center.items-center' , [h('p', 'Get Username'), h('span.mh1', iconPerson())])]),
        ]),
        h('p.mt2', {id: 'username-display'}, `Your username is: ${model.home.getUserName() || 'Not requested yet'}`),
    ]);
};

export default content;