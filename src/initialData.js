const categories = [
  {
    id: 1,
    title: 'Category 1',
    expanded: false,
    tasks: [
      {
        id: 1,
        title: 'To-Do Item #1',
        description: 'Description #1',
        done: false
      }
    ],
    categories: []
  },
  {
    id: 2,
    title: 'Category 2',
    expanded: false,
    tasks: [
      {
        id: 2,
        title: 'To-Do Item #2',
        description: 'Description #2',
        done: true
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 2 1',
        expanded: false,
        tasks: [],
        categories: [
          {
            id: 1,
            title: 'Category 2 1 1',
            expanded: false,
            tasks: [],
            categories: []
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Category 3',
    expanded: false,
    tasks: [
      {
        id: 3,
        title: 'To-Do Item #3',
        description: 'Description #3',
        done: true
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 3 1',
        expanded: false,
        tasks: [],
        categories: []
      },
      {
        id: 2,
        title: 'Category 3 2',
        expanded: false,
        tasks: [],
        categories: []
      },
      {
        id: 3,
        title: 'Category 3 3',
        expanded: false,
        tasks: [],
        categories: []
      }
    ]
  }
];

const tasks = [
  {
    id: 1,
    title: 'To-Do Item #1',
    description: 'Description #1',
    done: false
  },
  {
    id: 2,
    title: 'To-Do Item #2',
    description: 'Description #2',
    done: true
  },
  {
    id: 3,
    title: 'To-Do Item #3',
    description: 'Description #3',
    done: true
  }
];

export { categories, tasks };
