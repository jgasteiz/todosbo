# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as __


class Todo(models.Model):
    title = models.CharField(__('Title'), blank=False, max_length=120)
    order = models.IntegerField(default=0)
    done = models.BooleanField(default=False)

    class Meta:
        ordering = ('order',)

    def __unicode__(self):
        return self.title