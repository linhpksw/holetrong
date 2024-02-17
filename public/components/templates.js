// templates.js
const MALE_UP_COLOR = '#039BE5';
const FEMALE_UP_COLOR = '#FF46A3';

const NODE = '<rect x="0" y="0" height="{h}" width="{w}" rx="15" ry="15"></rect>';
const FIELD_0 = '<text class="field_0" x="10" y="110">{val}</text>';
// const FIELD_1 = '<text class="field_1" x="100" y="60">{val}</text>';

const EXPAND_ICON =
    '<circle cx="97" cy="-16" r="10" fill="#039BE5" stroke="#fff" stroke-width="2"><title>Expand</title></circle>' +
    '<line x1="90" y1="-16" x2="104" y2="-16" stroke-width="2" stroke="#fff"></line>' +
    '<line x1="97" y1="-23" x2="97" y2="-9" stroke-width="2" stroke="#fff"></line>';

const AVATAR =
    '<clipPath id="ulaImg">' +
    '<rect height="75" width="75" x="60" y="13" stroke-width="1" fill="#FF46A3" stroke="#aeaeae" rx="15" ry="15"></rect>' +
    '</clipPath>' +
    '<image x="60" y="13" preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" width="75" height="75">' +
    '</image>';

const MALE_UP = '<use x="85" y="-15" xlink:href="#linh_male_up"></use>';
const FEMALE_UP = '<use x="85" y="-15" xlink:href="#linh_female_up"></use>';

const POINTER =
    '<g data-pointer="pointer" transform="matrix(0,0,0,0,80,80)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">' +
    '<polygon fill="#039BE5" points="53.004,173.004 53.004,66.996 0,120" />' +
    '<polygon fill="#039BE5" points="186.996,66.996 186.996,173.004 240,120" />' +
    '<polygon fill="#FF46A3" points="66.996,53.004 173.004,53.004 120,0" />' +
    '<polygon fill="#FF46A3" points="120,240 173.004,186.996 66.996,186.996" />' +
    '<circle fill="red" cx="120" cy="120" r="30" />' +
    '</g></g>';

export function configureTemplates(FamilyTree) {
    FamilyTree.templates.linh = Object.assign({}, FamilyTree.templates.base);

    FamilyTree.templates.linh.size = [200, 120];
    FamilyTree.templates.linh.node = '<rect x="0" y="0" rx="15" ry="15"></rect>';

    FamilyTree.templates.linh.defs = `
<g transform="matrix(0.05,0,0,0.05,-13 ,-12)" id="heart">
    <path d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z" style="fill:#fff;stroke:red;stroke-miterlimit:10;stroke-width:24px" fill="red"></path><path d="M256,360a16,16,0,0,1-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06,25.22-56.33,55.53-56.33,20.4,0,35,10.63,44.1,20.41a6,6,0,0,0,8.72,0c9.11-9.78,23.7-20.41,44.1-20.41,30.31,0,55.22,25.27,55.53,56.33.28,27.1-9.31,52.13-29.3,76.5-9.38,11.44-26.4,29.73-65.7,56.41A16,16,0,0,1,256,360Z" fill="red"></path>
  </g>
  <g id="linh_male_up">
    <circle cx="15" cy="15" r="10" fill="#fff"></circle>
    ${FamilyTree.icon.ft(15, 15, MALE_UP_COLOR, 7.5, 7.5)}
  </g>

  <g id="linh_female_up">
    <circle cx="15" cy="15" r="10" fill="#fff"></circle>
    ${FamilyTree.icon.ft(15, 15, FEMALE_UP_COLOR, 7.5, 7.5)}
  </g>`;

    // Male
    FamilyTree.templates.linh_male = Object.assign({}, FamilyTree.templates.linh);
    FamilyTree.templates.linh_male.node = NODE;
    FamilyTree.templates.linh_male.field_0 = FIELD_0;
    // FamilyTree.templates.linh_male.field_1 = FIELD_1;

    // Female
    FamilyTree.templates.linh_female = Object.assign({}, FamilyTree.templates.linh);
    FamilyTree.templates.linh_female.node = NODE;

    FamilyTree.templates.linh_female.field_0 = FIELD_0;
    // FamilyTree.templates.linh_female.field_1 = FIELD_1;

    FamilyTree.templates.linh_male.plus = EXPAND_ICON;
    FamilyTree.templates.linh_female.plus = EXPAND_ICON;

    // Image
    FamilyTree.templates.linh_male.img_0 = AVATAR;
    FamilyTree.templates.linh_female.img_0 = AVATAR;

    FamilyTree.templates.linh_male.up = MALE_UP;
    FamilyTree.templates.linh_female.up = FEMALE_UP;

    // Pointer
    FamilyTree.templates.linh.pointer = POINTER;
}
