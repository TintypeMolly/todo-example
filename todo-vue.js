const app = new Vue({
    el: '#app',
    data: {
        todoItems: [],
        newTodoName: '',
        filter: null,
        sortOrder: null,
    },
    methods: {
        addItem: function(name) {
            this.todoItems.push({
                name: name,
                done: false,
            });
        },
        removeItem: function(item) {
            this.todoItems = this.todoItems.filter(i => i !== item);
        },
    },
    computed: {
        processedTodoItems: function() {
            return this.todoItems.filter(
                item =>
                !this.filter ||
                (this.filter === 'done' && item.done) ||
                (this.filter === 'undone' && !item.done)
            ).sort(
                (item1, item2) => {
                    if (!this.sortOrder) {
                        return 1;
                    } else {
                        const nameComparison = item1.name.localeCompare(item2.name);
                        return ( this.sortOrder === 'asc' ? 1 : -1 ) * nameComparison;
                    }
                }
            );
        },
    },
});
