# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-07 20:30
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Animals',
            new_name='Animal',
        ),
    ]
