// eventHandlers.js

export function attachEventHandlers(family) {
    family.on('render-link', function (sender, args) {
        if (args.cnode.ppid != undefined) {
            args.html +=
                '<use data-ctrl-ec-id="' +
                args.node.id +
                '" xlink:href="#heart" x="' +
                args.p.xa +
                '" y="' +
                args.p.ya +
                '"/>';
        }
        if (args.cnode.isPartner && args.node.partnerSeparation == 30) {
            args.html +=
                '<use data-ctrl-ec-id="' +
                args.node.id +
                '" xlink:href="#heart" x="' +
                args.p.xb +
                '" y="' +
                args.p.yb +
                '"/>';
        }

        if (args.name == 'born') {
            var date = new Date(args.value);
            args.value = date.toLocaleDateString('vi-VN');
        }
    });

    // family.onUpdateNode((args) => {
    //     console.log('onUpdateNode', args);

    //     // Post the data from args to your server using fetch
    //     fetch(`http://localhost:9999/nodes/${args.node.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(args.node),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error('There was an error!', error);
    //         });
    // });

    // family.editUI.on('element-btn-click', function (sender, args) {
    //     FamilyTree.fileUploadDialog(function (file) {
    //         let formData = new FormData();
    //         formData.append('file', file);
    //         alert('upload the file');
    //         console.log(args);
    //     });
    // });

    // console.log('family: ', family);

    // Add other event handlers as needed...
}
