# -*- coding: utf-8 -*-
from django.contrib import admin
from todosbo.app.models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'order', 'done')


admin.site.register(Todo, TodoAdmin)
