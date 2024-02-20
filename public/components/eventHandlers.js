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
    });

    family.onUpdateNode(async (args) => {
        console.log('onUpdateNode', args);

        // Handle additions
        if (args.addNodesData && args.addNodesData.length > 0) {
            try {
                const addPromises = args.addNodesData.map((node) =>
                    fetch('/nodes/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(node),
                    }).then((response) => response.json())
                );

                const addResults = await Promise.all(addPromises);
                console.log('Add results:', addResults);
            } catch (error) {
                console.error('Error adding nodes:', error);
            }
        }

        // Handle updates
        if (args.updateNodesData && args.updateNodesData.length > 0) {
            try {
                const updatePromises = args.updateNodesData.map((node) =>
                    fetch(`/nodes/update/${node.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(node),
                    }).then((response) => response.json())
                );

                const updateResults = await Promise.all(updatePromises);
                console.log('Update results:', updateResults);
            } catch (error) {
                console.error('Error updating nodes:', error);
            }
        }
    });

    family.editUI.on('element-btn-click', function (sender, args) {
        console.log(args);

        FamilyTree.fileUploadDialog(function (file) {
            let formData = new FormData();
            formData.append('file', file);
            alert('upload the file');
            console.log(args);
        });
    });

    family.editUI.on('button-click', function (sender, args) {
        if (args.name == 'map') {
            var data = family.get(args.nodeId);
            window.open(data.map);
        } else if (args.name == 'edit') {
        }
    });

    // // Use query selector to target the save and cancel buttons
    // var cancelButton = document.querySelector('[data-edit-from-cancel]');
    // var saveButton = document.querySelector('[data-edit-from-save]');

    // // Listen for the cancel button click event
    // cancelButton.addEventListener('click', function () {
    //     var formFields = document.querySelector('.bft-edit-form-fields');
    //     formFields.classList.remove('bft-edit-form-fields-active');
    // });

    // // Listen for the save button click event
    // saveButton.addEventListener('click', function () {
    //     var formFields = document.querySelector('.bft-edit-form-fields');
    //     formFields.classList.remove('bft-edit-form-fields-active');
    // });

    console.log('family: ', family);

    // Add other event handlers as needed...
}
