// familyTreeConfig.js
import { configureTemplates } from '../components/templates.js';
import { nodeCircleMenu, circleMenuBtn, circleMenuEvent } from '../components/circleMenus.js';

export function initializeFamilyTree(containerId) {
    configureTemplates(FamilyTree);

    let family = new FamilyTree(document.getElementById(containerId), {
        mouseScrool: FamilyTree.action.ctrlZoom,
        // enableTouch: true,
        template: 'linh',
        nodeTreeMenu: true,
        enableSearch: true,
        scaleInitial: FamilyTree.match.boundary,
        nodeBinding: {
            field_0: 'name',
            img_0: 'photo',
            // field_1: 'born',
        },
        toolbar: {
            fullScreen: true,
            zoom: true,
        },
        nodeCircleMenu: nodeCircleMenu,
        // undoRedoStorageName: 'myStorageName',
        orderBy: 'orderId',
    });

    circleMenuBtn(FamilyTree);
    circleMenuEvent(family);
    return family;
}
