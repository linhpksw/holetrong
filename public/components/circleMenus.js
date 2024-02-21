const MALE_COLOR = '#039BE5';
const FEMALE_COLOR = '#FF46A3';
const MENU_ITEM_COLOR = '#f57c00';
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0,0,255.99409,255.99409"
style="fill:#000000;">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M19.17188,2c-0.72375,0 -1.4475,0.27562 -2,0.82813l-1.17187,1.17188l4,4l1.17188,-1.17187c1.104,-1.104 1.104,-2.895 0,-4c-0.5525,-0.5525 -1.27625,-0.82812 -2,-0.82812zM14.5,5.5l-11.5,11.5v4h4l11.5,-11.5z"></path></g></g>
</svg>`;

const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0,0,255.99409,255.99409"
style="fill:#000000;">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"></path></g></g>
</svg>`;

const callIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" d="M 16.039062 13.3125 C 16.394531 13.671875 16.558594 14.175781 16.480469 14.671875 C 16.402344 15.171875 16.09375 15.601562 15.648438 15.832031 C 14.386719 16.507812 12.921875 16.679688 11.539062 16.316406 C 7.875 15.390625 2.609375 10.125 1.683594 6.460938 C 1.320312 5.078125 1.492188 3.613281 2.167969 2.351562 C 2.398438 1.90625 2.828125 1.597656 3.328125 1.519531 C 3.824219 1.441406 4.328125 1.605469 4.6875 1.960938 L 6.25 3.523438 C 6.710938 3.980469 6.84375 4.675781 6.582031 5.269531 C 6.445312 5.597656 6.246094 5.894531 6 6.148438 C 4.210938 7.9375 10.0625 13.789062 11.851562 12 C 12.105469 11.753906 12.402344 11.554688 12.730469 11.414062 C 13.324219 11.152344 14.019531 11.285156 14.476562 11.746094 Z M 16.039062 13.3125 "/>
</g>
</svg>
`;

export const nodeCircleMenu = {
    // PDFProfile: {
    //     icon: FamilyTree.icon.pdf(20, 20, 'white'),
    //     text: 'PDF Profile',
    //     color: MENU_ITEM_COLOR,
    // },
    editNode: {
        icon: editIcon,
        text: 'Edit node',
        color: MENU_ITEM_COLOR,
    },
    removeCustomNode: {
        icon: removeIcon,
        text: 'Remove custom node',
        color: MENU_ITEM_COLOR,
    },
    callNode: {
        icon: callIcon,
        text: 'Call node',
        color: MENU_ITEM_COLOR,
    },
};

export function circleMenuBtn(FamilyTree) {
    const menuMaleBtnConfig = {
        radius: 15,
        x: 175,
        y: 25,
        color: MALE_COLOR,
        stroke: '#fff',
    };

    const menuFemaleBtnConfig = {
        radius: 15,
        x: 175,
        y: 25,
        color: FEMALE_COLOR,
        stroke: '#fff',
    };

    FamilyTree.templates.linh_female.nodeCircleMenuButton = menuFemaleBtnConfig;
    FamilyTree.templates.linh_male.nodeCircleMenuButton = menuMaleBtnConfig;
}

export function circleMenuEvent(family) {
    // Event Handlers
    family.nodeCircleMenuUI.on('click', function (sender, args) {
        const data = family.get(args.nodeId);
        const { name, phone } = data;

        const formatName = name ? name : 'người này';

        switch (args.menuItemName) {
            // case 'PDFProfile':
            //     family.exportPDFProfile({
            //         id: args.nodeId,
            //     });
            //     break;
            case 'editNode':
                family.editUI.show(args.nodeId);
                break;
            case 'removeCustomNode':
                const isConfirmed = confirm(`Bạn có chắc muốn xoá ${formatName} không?

Chú ý: toàn bộ vợ/chồng và con cái của người này cũng sẽ bị xoá theo.`);

                if (isConfirmed) {
                    fetch(`/nodes/delete/${args.nodeId}`, {
                        method: 'DELETE',
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log('Node removed:', data);
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.error('Error removing node:', error);
                        });
                } else {
                    // console.log('Node deletion canceled by the user.');
                }
                break;
            case 'callNode':
                if (phone) {
                    window.open(`tel:${phone}`);
                } else {
                    alert('Không có số điện thoại cho ' + formatName + '.');
                }
                break;
            default:
        }
    });

    family.nodeCircleMenuUI.on('mouseenter', function (sender, args) {
        if (args.menuItem.text == 'Remove custom node') {
            let node = document.querySelector('[data-n-id="' + args.from + '"]');
            node.style.opacity = 0.5;
        }
    });

    family.nodeCircleMenuUI.on('mouseout', function (sender, args) {
        let node = document.querySelector('[data-n-id="' + args.from + '"]');
        node.style.opacity = 1;
    });
}
