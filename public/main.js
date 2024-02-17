import { initializeFamilyTree } from './config/familyTreeConfig.js';
import { attachEventHandlers } from './components/eventHandlers.js';

// Function to fetch nodes from the backend
async function fetchNodes() {
    const response = await fetch('/nodes');
    const nodes = await response.json();
    return nodes;
}

// Initialize the family tree with nodes from the backend
async function initialize() {
    const nodes = await fetchNodes();
    const family = initializeFamilyTree('tree');
    family.load(nodes);
    attachEventHandlers(family);
}

// Call the initialize function on page load
initialize();
