export const CUST_FIELD_STORY_POINTS = 'customfield_10002';
export const CUST_FIELD_RND_DEVISION = 'customfield_10600';
export const NONE = 'n/a';
export const NAME = 'effective-waffle';

export const LABELS = [
    'GUI',
    'CORE',
    'QA',
    'DB',
    'DEV',
    'IMDB',
    'DOC',
    'OTHER',
];


// https://materialuicolors.co/
export const COLORS = [
    '#FFD54F',
    '#E57373',
    '#64B5F6',
    '#81C784',
    '#7986CB',
    '#DCE775',
    '#A1887F',
    '#BA68C8',
    '#4DB6AC',
];

export const LABEL_TO_COLOR = {};
LABELS.forEach((label, index) => {
    LABEL_TO_COLOR[label] = COLORS[index];
});

export const LABEL_OTHER = 'OTHER';
