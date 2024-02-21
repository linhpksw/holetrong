// familyTreeConfig.js
import { configureTemplates } from '../components/templates.js';
import { nodeCircleMenu, circleMenuBtn, circleMenuEvent } from '../components/circleMenus.js';

const mapIcon = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(9.803922%,9.803922%,9.803922%);fill-opacity:1;" d="M 11 0.171875 C 6.667969 0.171875 3.144531 3.644531 3.144531 7.90625 C 3.144531 12.167969 11 21.828125 11 21.828125 C 11 21.828125 18.855469 12.167969 18.855469 7.90625 C 18.855469 3.644531 15.332031 0.171875 11 0.171875 Z M 11 12.875 C 8.148438 12.875 5.84375 10.605469 5.84375 7.804688 C 5.84375 4.984375 8.148438 2.714844 11 2.714844 C 13.851562 2.714844 16.15625 4.984375 16.15625 7.785156 C 16.15625 10.585938 13.851562 12.875 11 12.875 Z M 11 12.875 "/>
</g>
</svg>
`;
const pdfIcon = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 6.40625 11.273438 C 6.40625 10.679688 5.996094 10.328125 5.269531 10.328125 C 4.972656 10.328125 4.773438 10.355469 4.667969 10.382812 L 4.667969 12.285156 C 4.792969 12.3125 4.945312 12.324219 5.152344 12.324219 C 5.929688 12.324219 6.40625 11.933594 6.40625 11.273438 Z M 6.40625 11.273438 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 10.898438 10.34375 C 10.574219 10.34375 10.363281 10.375 10.238281 10.402344 L 10.238281 14.617188 C 10.363281 14.648438 10.566406 14.648438 10.746094 14.648438 C 12.066406 14.65625 12.925781 13.929688 12.925781 12.390625 C 12.933594 11.050781 12.152344 10.34375 10.898438 10.34375 Z M 10.898438 10.34375 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 19.507812 7.871094 L 18.980469 7.871094 L 18.980469 5.320312 C 18.980469 5.304688 18.976562 5.289062 18.976562 5.273438 C 18.976562 5.171875 18.941406 5.070312 18.875 4.992188 L 14.632812 0.148438 C 14.628906 0.144531 14.628906 0.144531 14.628906 0.144531 C 14.601562 0.117188 14.574219 0.09375 14.542969 0.0742188 C 14.53125 0.0664062 14.523438 0.0625 14.515625 0.0546875 C 14.488281 0.0390625 14.457031 0.0273438 14.429688 0.0195312 C 14.421875 0.0195312 14.414062 0.015625 14.40625 0.0117188 C 14.375 0.00390625 14.339844 0 14.308594 0 L 3.882812 0 C 3.40625 0 3.019531 0.386719 3.019531 0.863281 L 3.019531 7.867188 L 2.492188 7.867188 C 1.808594 7.867188 1.257812 8.421875 1.257812 9.101562 L 1.257812 15.515625 C 1.257812 16.195312 1.808594 16.746094 2.492188 16.746094 L 3.019531 16.746094 L 3.019531 21.136719 C 3.019531 21.613281 3.40625 22 3.882812 22 L 18.117188 22 C 18.59375 22 18.980469 21.613281 18.980469 21.136719 L 18.980469 16.746094 L 19.507812 16.746094 C 20.1875 16.746094 20.742188 16.195312 20.742188 15.515625 L 20.742188 9.101562 C 20.742188 8.421875 20.1875 7.871094 19.507812 7.871094 Z M 3.882812 0.863281 L 13.875 0.863281 L 13.875 5.277344 C 13.875 5.515625 14.070312 5.707031 14.308594 5.707031 L 18.117188 5.707031 L 18.117188 7.871094 L 3.882812 7.871094 Z M 14.472656 12.34375 C 14.472656 13.578125 14.023438 14.425781 13.402344 14.953125 C 12.722656 15.515625 11.691406 15.785156 10.429688 15.785156 C 9.675781 15.785156 9.140625 15.734375 8.777344 15.6875 L 8.777344 9.359375 C 9.3125 9.273438 10.011719 9.226562 10.746094 9.226562 C 11.96875 9.226562 12.761719 9.449219 13.382812 9.914062 C 14.050781 10.414062 14.472656 11.207031 14.472656 12.34375 Z M 3.222656 15.71875 L 3.222656 9.359375 C 3.671875 9.285156 4.304688 9.226562 5.191406 9.226562 C 6.089844 9.226562 6.730469 9.398438 7.160156 9.742188 C 7.570312 10.070312 7.847656 10.605469 7.847656 11.234375 C 7.847656 11.867188 7.640625 12.402344 7.257812 12.765625 C 6.757812 13.230469 6.023438 13.441406 5.164062 13.441406 C 4.972656 13.441406 4.800781 13.433594 4.667969 13.414062 L 4.667969 15.71875 Z M 18.117188 20.902344 L 3.882812 20.902344 L 3.882812 16.746094 L 18.117188 16.746094 Z M 19.367188 10.46875 L 16.890625 10.46875 L 16.890625 11.941406 L 19.203125 11.941406 L 19.203125 13.128906 L 16.890625 13.128906 L 16.890625 15.71875 L 15.429688 15.71875 L 15.429688 9.273438 L 19.367188 9.273438 Z M 19.367188 10.46875 "/>
</g>
</svg>
`;
const callIcon = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 19.601562 16.269531 C 20.039062 16.710938 20.238281 17.324219 20.144531 17.933594 C 20.046875 18.542969 19.671875 19.070312 19.125 19.351562 C 17.582031 20.175781 15.792969 20.386719 14.101562 19.941406 C 9.625 18.8125 3.1875 12.375 2.058594 7.898438 C 1.613281 6.207031 1.824219 4.417969 2.648438 2.875 C 2.929688 2.328125 3.457031 1.953125 4.066406 1.855469 C 4.675781 1.761719 5.289062 1.960938 5.730469 2.398438 L 7.640625 4.304688 C 8.203125 4.863281 8.363281 5.714844 8.042969 6.441406 C 7.878906 6.839844 7.632812 7.203125 7.332031 7.515625 C 5.148438 9.703125 12.296875 16.851562 14.484375 14.667969 C 14.796875 14.367188 15.160156 14.121094 15.558594 13.949219 C 16.285156 13.628906 17.136719 13.792969 17.695312 14.355469 Z M 19.601562 16.269531 "/>
</g>
</svg>

`;
const editIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 24 24">
<path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
</svg>`;
const removeIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 18 18" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 4.316406 15.210938 L 3 6 L 15 6 L 13.683594 15.210938 C 13.578125 15.953125 12.945312 16.5 12.199219 16.5 L 5.800781 16.5 C 5.054688 16.5 4.421875 15.953125 4.316406 15.210938 Z M 15.75 3 L 12 3 L 12 2.25 C 12 1.835938 11.664062 1.5 11.25 1.5 L 6.75 1.5 C 6.335938 1.5 6 1.835938 6 2.25 L 6 3 L 2.25 3 C 1.835938 3 1.5 3.335938 1.5 3.75 C 1.5 4.164062 1.835938 4.5 2.25 4.5 L 15.75 4.5 C 16.164062 4.5 16.5 4.164062 16.5 3.75 C 16.5 3.335938 16.164062 3 15.75 3 Z M 15.75 3 "/>
</g>
</svg>`;

const uploadImageIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98zM16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58-.37-.38-.58-.88-.58-1.44 0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28-1.09-.01-1.98-.9-1.98-1.99zM15.96 19H6c-.41 0-.65-.47-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81z"/></svg>
`;

FamilyTree.elements.myTextArea = function (data, editElement, minWidth, readOnly) {
    let id = FamilyTree.elements.generateId();
    let value = data[editElement.binding];
    if (value == undefined) value = '';
    if (readOnly && !value) {
        return {
            html: '',
        };
    }
    let rOnlyAttr = readOnly ? 'readonly' : '';
    let rDisabledAttr = readOnly ? 'disabled' : '';
    return {
        html: `<label 
            style="
                display: block;
                width: 100%;
                color: #039be5;font-weight: 600;
                margin: 0 0 0 10px;
                padding: 10px 0 0 0;
            "
            for="${id}">
            ${editElement.label}
        </label>

        <textarea ${rDisabledAttr} ${rOnlyAttr} 
            id="${id}" 
            style="
                width: 100%;
                min-height: 200px;
                margin: 0 0 5px 5px;
                padding: 5px;
                box-sizing: border-box;
                resize: none;
                overflow-y: hidden;
                background-color: transparent;
                border: 1px solid #ccc;
                border-radius: 5px;
                line-height: 1.5 !important;
                color: #757575;"
            name="${id}" 
            style="width: 100%;"
            data-binding="${editElement.binding}">${value}</textarea>`,
        id: id,
        value: value,
    };
};

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
            img_0: 'imgUrl',
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
            photoBinding: 'imgUrl',
            generateElementsFromFields: false,
            elements: [
                [
                    { type: 'textbox', label: 'Họ và tên', binding: 'name' },
                    { type: 'textbox', label: 'Tên khác', binding: 'otherName' },
                ],
                {
                    type: 'select',
                    label: 'Giới tính',
                    binding: 'gender',
                    options: [
                        { value: 'male', text: 'Nam' },
                        { value: 'female', text: 'Nữ' },
                    ],
                },

                [
                    { type: 'date', label: 'Ngày sinh (Dương lịch)', binding: 'solarBirthDate' },
                    { type: 'date', label: 'Ngày sinh (Âm lịch)', binding: 'lunarBirthDate' },
                ],

                { type: 'textbox', label: 'Nơi sinh', binding: 'birthPlace' },
                { type: 'textbox', label: 'Quê quán', binding: 'homeTown' },

                [
                    { type: 'date', label: 'Ngày mất (Dương lịch)', binding: 'solarDeathDate' },
                    { type: 'date', label: 'Ngày mất (Âm lịch)', binding: 'lunarDeathDate' },
                ],
                { type: 'textbox', label: 'Nơi an táng', binding: 'deathPlace' },

                { type: 'textbox', label: 'Chỗ ở hiện tại', binding: 'currentResidence' },
                { type: 'textbox', label: 'Điện thoại', binding: 'phone' },
                { type: 'textbox', label: 'Email', binding: 'email' },
                { type: 'textbox', label: 'Link Facebook', binding: 'fbUrl' },

                {
                    type: 'myTextArea',
                    label: 'Thông tin khác (công danh, chức vụ,...):',
                    binding: 'moreInfo',
                },
            ],
            buttons: {
                map: {
                    icon: mapIcon,
                    text: 'Map',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
                },
                call: {
                    icon: callIcon,
                    text: 'Call',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
                },
                edit: {
                    icon: editIcon,
                    text: 'Edit',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
                },
                share: null,
                // pdf: {
                //     icon: pdfIcon,
                //     text: 'Save as PDF',
                //     hideIfEditMode: true,
                //     hideIfDetailsMode: false,
                // },
                pdf: null,
                remove: null,
                removeCustom: {
                    icon: removeIcon,
                    text: 'Remove custom',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
                },
                uploadImage: {
                    icon: uploadImageIcon,
                    text: 'Upload Image',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
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
