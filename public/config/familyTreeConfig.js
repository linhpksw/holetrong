// familyTreeConfig.js
import { configureTemplates } from '../components/templates.js';
import { nodeCircleMenu, circleMenuBtn, circleMenuEvent } from '../components/circleMenus.js';

const mapIcon = `<svg width="24" height="24" viewBox="0 0 490 490" >
            <polygon fill="#fff" points="320.217,101.428 171.009,5.241 171.009,392.966 320.217,485.979 	"/>
            <polygon fill="#fff" points="335.529,99.857 335.529,484.679 490,391.948 490,0 	"/>
            <polygon fill="#fff" points="155.697,3.659 0,82.979 0,490 155.697,392.942 	"/>
        </svg>`;

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
        editForm: {
            titleBinding: 'name',
            photoBinding: 'photo',
            generateElementsFromFields: false,
            elements: [
                { type: 'textbox', label: 'Full Name', binding: 'name' },
                { type: 'textbox', label: 'Photo Url', binding: 'ImgUrl', btn: 'Upload' },

                [
                    { type: 'date', label: 'Birth Date', binding: 'birthDate' },
                    { type: 'date', label: 'Death Date', binding: 'deathDate' },
                ],
                { type: 'textbox', label: 'Gender', binding: 'gender' },

                // Add other fields as necessary
            ],
            buttons: {
                map: {
                    icon: mapIcon,
                    text: 'Map',
                },
                edit: {
                    icon: FamilyTree.icon.edit(24, 24, '#fff'),
                    text: 'Edit',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
                },
                share: null,
                pdf: {
                    icon: FamilyTree.icon.pdf(24, 24, '#fff'),
                    text: 'Save as PDF',
                },
            },
            addMore: null,
            addMoreBtn: 'Add element',
            addMoreFieldName: 'Element name',
            cancelBtn: 'Huỷ',
            saveAndCloseBtn: 'Lưu',
        },
    });

    circleMenuBtn(FamilyTree);
    circleMenuEvent(family);
    return family;
}
