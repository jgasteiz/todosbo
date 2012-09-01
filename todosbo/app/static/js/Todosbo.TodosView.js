
TODOSBO.TodosView = Backbone.View.extend({

    // Instead of generating a new element, bind to an existing one
    el: $("#todoapp"),

    statsTemplate: _.template($('#stats-template').html()),

    events: {
        "keypress #new-todo":  "createOnEnter",
        "click #clear-completed": "clearCompleted",
        "click #toggle-all": "toggleAllComplete"
    },

    initialize: function(){
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.addAll, this);
        this.collection.on('change', this.showStats, this);
        this.collection.on('remove', this.showStats, this);

        this.input = this.$("#new-todo");
        this.allCheckbox = this.$("#toggle-all")[0];
        this.footer = this.$('footer');
        this.main = $('#main');
    },

    showStats: function() {
        var done = this.collection.done().length;
        var remaining = this.collection.remaining().length;
        
        if (this.collection.length > 0) {
            this.main.show();
            this.footer.show();
            this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
        } else {
            this.main.hide();
            this.footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    // For each element of the collection, renders it on the view context
    addAll: function(){
        this.$("#todo-list").empty();
        this.collection.forEach(this.addOne, this);
        this.showStats();
    },

    addOne: function(todoItem){
        var todoView = new TODOSBO.TodoView({model: todoItem});
        this.$("#todo-list").append(todoView.render().el); 
    },

    // If you hit return in the main input field, create new **Todo** model,
    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        if (!this.input.val()) return;

        this.collection.create({title: this.input.val()});
        this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
        _.each(this.collection.done(), function(todo){ todo.clear(); });
        return false;
    },

    toggleAllComplete: function () {
        var done = this.allCheckbox.checked;
        this.collection.each(function (todo) { todo.save({'done': done}); });
    }
});
