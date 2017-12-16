export const CUST_FIELD_STORY_POINTS = 'customfield_10002';
export const CUST_FIELD_RND_DEVISION = 'customfield_10600';
export const NONE = 'N/A';
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
    '#FFB74D'
];

export const LABEL_TO_COLOR = {};
LABELS.forEach((label, index) => {
    LABEL_TO_COLOR[label] = COLORS[index];
});

export const LABEL_OTHER = 'OTHER';

export const HUMANISER_OPTS = {
    units: [/*'y', 'mo',*/'w', 'd', 'h', 'm', 's'],
    unitMeasures: {
        //y: 31557600000,
        //mo: 2629800000, // jira 864000000
        w: 144000000, // jira 144000000 normal 604800000
        d: 28800000, // jira 28800000 normal 86400000
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
    },
    // largest: 4,
    round: true,

    language: 'shortEn',

    languages: {
        shortEn: {
            //y: () => 'y',
            //mo: () => 'mo',
            w: () => 'w',
            d: () => 'd',
            h: () => 'h',
            m: () => 'm',
            s: () => 's',
            //ms: () => 'ms',
        }
    },

    spacer: '',
    delimiter: ' ',

};
