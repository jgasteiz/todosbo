
TODOSBO.TodoView = Backbone.View.extend({

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    events: {
        'change .check': 'toggleStatus',
        'click .destroy': 'clear',
        'dblclick': 'edit',
        'keypress .edit'  : 'updateOnEnter',
        'blur .edit': 'close'
    },

    tagName: 'li',

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy hide', this.remove, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    edit: function() {
        this.$el.addClass("editing");
        this.input.focus();
    },

    close: function() {
        var value = this.input.val();
        if (!value) this.clear();
        this.model.save({title: value});
        this.$el.removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
        this.model.clear();
    },

    toggleStatus: function() {
        this.model.toggleStatus()
    }
});

