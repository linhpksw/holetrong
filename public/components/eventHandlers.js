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

                // console.log('Add results:', addResults);
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

                // console.log('Update results:', updateResults);
            } catch (error) {
                console.error('Error updating nodes:', error);
            }
        }
    });

    family.editUI.on('element-btn-click', function (sender, args) {
        //    Upload trong form
    });

    family.editUI.on('button-click', function (sender, args) {
        const btnName = args.name;
        const data = family.get(args.nodeId);

        const { name, phone } = data;
        const formatName = name ? name : 'người này';

        switch (btnName) {
            case 'map':
                if (data && data.currentResidence) {
                    // URL encode the address
                    const encodedAddress = encodeURIComponent(data.currentResidence);
                    // Construct the Google Maps search URL
                    const googleMapsSearchUrl = `https://www.google.com/maps/search/${encodedAddress}`;
                    // Open the URL in a new tab/window
                    window.open(googleMapsSearchUrl);
                } else {
                    console.error('No current residence data found for nodeId:', args.nodeId);
                }

                break;
            case 'uploadImage':
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

                            // Reload the page to show the new avatar
                            window.location.reload();
                        } else {
                            alert('Avatar upload failed.');
                        }
                        console.log(data);
                    } catch (error) {
                        console.error('Error uploading avatar:', error);
                        alert('Error uploading avatar.');
                    }
                });

                break;

            case 'removeCustom':
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
                    console.log('Node deletion canceled by the user.');
                }
                break;

            case 'call':
                if (phone) {
                    window.open(`tel:${phone}`);
                } else {
                    alert('Không có số điện thoại cho ' + formatName);
                }
                break;
            default:
                break;
        }
    });
}
