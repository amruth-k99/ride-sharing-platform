# Generated by Django 5.1.4 on 2024-12-09 00:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disco', '0003_remove_ride_role'),
        ('users', '0002_remove_userprofile_app_shared_count_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ride',
            name='provider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='provider_id', to='users.userprofile'),
        ),
        migrations.AlterField(
            model_name='ride',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id', to='users.userprofile'),
        ),
    ]
