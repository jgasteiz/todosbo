
TODOSBO.Todo = Backbone.Model.extend({
    
    // Default attributes for the todo item.
    defaults: function() {
        return {
            title: "empty todo...",
            order: TODOSBO.App.todoItems.nextOrder(),
            done: false
        };
    },

    toggleStatus: function() {
        if(this.get('done') == false) {
            this.set({'done': true});
        }
        else {
            this.set({'done': false});
        }
        this.save();
    },

    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
        this.destroy();
    }
});