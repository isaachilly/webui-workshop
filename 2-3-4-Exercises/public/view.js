import {h, switchCase} from '/js/src/index.js';
import homeContent from './home/homePage.js';
import aboutContent from './about/aboutPage.js';

/**
 * Main view layout
 * @return {vnode} application view to be drawn according to model
 */
export default (model) => [
  h('.flex-column.absolute-fill', [
    header(model),
    content(model)
  ])
];

/**
 * Top header of the page
 * @return {vnode}
 */
const header = (model) =>
  h('.p2.shadow-level2.level2.f3', {
    style: 'display: flex; justify-content: center'
  }, [model.router.params.page || 'default page', ' - Random number: ', model.randomNumber !== null ? model.randomNumber : 'N/A']);

/**
 * Page content
 * @return {vnode}
 */
const content = (model) => {
  return switchCase(model.router.params.page, {
    home: () => homeContent(model),
    about: () => aboutContent(model),
  }, h('', 'Page not found'))();
};
