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
            img_0: 'ImgUrl',
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
            photoBinding: 'ImgUrl',
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

                { type: 'textbox', label: 'Công danh (khoa bảng đỗ đạt và chức vụ đạt được)', binding: 'achivements' },

                { type: 'textbox', label: 'Thông tin khác', binding: 'moreInfo' },

                { type: 'textbox', label: 'Đường dẫn ảnh', binding: 'ImgUrl', btn: 'Tải lên' },
            ],
            buttons: {
                map: {
                    icon: mapIcon,
                    text: 'Map',
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
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
                    hideIfEditMode: true,
                    hideIfDetailsMode: false,
                },
                remove: null,
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
