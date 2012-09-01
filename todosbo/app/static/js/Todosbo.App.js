
/*
 *  Main application. Initializes the todos collection and the main view
 *
 */
TODOSBO.App = new (Backbone.Router.extend({
    routes: {
        "": "index",
        "todos/:id": "show"
    },

    initialize: function(){
        this.todoItems = new TODOSBO.TodoList();
        this.todosView = new TODOSBO.TodosView({collection: this.todoItems});
    },

    index: function(){
        this.todoItems.fetch();
    },

    start: function(){
        Backbone.history.start();
    },

    show: function(id){
        this.todoItems.focusOnTodoItem(id);
    }
}));