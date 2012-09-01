# -*- coding: utf-8 -*-
from todosbo.app.models import Todo
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization


class TodoResource(ModelResource):
    class Meta:
        queryset = Todo.objects.all()
        resource_name = 'todo'
        authorization= Authorization()