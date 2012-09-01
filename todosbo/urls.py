# -*- coding: utf-8 -*-
from django.contrib import admin
from todosbo.app.api import TodoResource
from django.views.generic import TemplateView
from django.conf.urls import patterns, include, url

admin.autodiscover()
todo_resource = TodoResource()

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', TemplateView.as_view(template_name='app/home.html'), name='home'),
    url(r'^api/', include(todo_resource.urls)),
    
)
