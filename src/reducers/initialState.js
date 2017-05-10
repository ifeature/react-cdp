const initialState = {
    categories: [
        {
            id: 1,
            parent: null,
            expanded: false,
            title: 'Category #1',
            tasks: [11],
            categories: [2]
        },
        {
            id: 2,
            parent: 1,
            expanded: false,
            title: 'Category #1.1',
            tasks: [22],
            categories: []
        },
        {
            id: 3,
            parent: null,
            expanded: false,
            title: 'Category #2',
            tasks: [],
            categories: [4]
        },
        {
            id: 4,
            parent: 3,
            expanded: false,
            title: 'Category #2.1',
            tasks: [],
            categories: []
        }
    ],
    tasks: [
        {
            id: 11,
            title: 'To-Do Item #1',
            description: 'Description #1',
            done: false
        },
        {
            id: 22,
            title: 'To-Do Item #2',
            description: 'Description #2',
            done: true
        }
    ],
    search: {
        query: {
            title: '',
            done: false
        },
        data: [],
        error: false,
        pristine: true
    },
    selected: {
        category: null,
        task: null
    },
    editMode: false
};

export default initialState;
