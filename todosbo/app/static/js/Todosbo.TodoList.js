
TODOSBO.TodoList = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TODOSBO.Todo,

    url: '/api/todo/?format=json/',

    initialize: function(){
        this.on('remove', this.hideModel, this);
    },
    
    hideModel: function(model){
        model.trigger('hide');
    },

    nextOrder: function() {
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },

    focusOnTodoItem: function(id) {
        var modelsToRemove = this.filter(function(todoItem){
            return todoItem.id != id;
        });
        this.remove(modelsToRemove);
    },

    // Filter down the list of all todo items that are finished.
    done: function() {
        return this.filter(function(todo){ return todo.get('done'); });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
        return this.without.apply(this, this.done());
    }

});