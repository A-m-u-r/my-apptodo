export const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Some text 1'},
        'task-2': { id: 'task-2', content: 'Some text 2'},
        'task-3': { id: 'task-3', content: 'Some text 3'},
        'task-4': { id: 'task-4', content: 'Some text 4'},
        'task-5': { id: 'task-5', content: 'Some text 5'},
        'task-6': { id: 'task-6', content: 'Some text 6'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Надо сделать',
            taskIds: ['task-1', 'task-4', 'task-5']
        },
    },

    columnOrder: ['column-1']
}