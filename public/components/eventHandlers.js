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
        // console.log('onUpdateNode', args);

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
        FamilyTree.fileUploadDialog(async function (file) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('nodeId', args.nodeId); // Include the nodeId in the request

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData, // Send the file and nodeId to the server
                });
                const data = await response.json();

                if (data.status === 'Avatar uploaded and node updated!') {
                    alert('Avatar uploaded successfully!');
                    // initialize();
                    // You might want to update the UI with the new avatar URL
                } else {
                    alert('Avatar upload failed.');
                }
                console.log(data);
            } catch (error) {
                console.error('Error uploading avatar:', error);
                alert('Error uploading avatar.');
            }
        });
    });

    family.editUI.on('button-click', function (sender, args) {
        if (args.name == 'map') {
            var data = family.get(args.nodeId);
            window.open(data.map);
        } else if (args.name == 'edit') {
        }
    });
}
