# Generated by Django 4.2.9 on 2024-01-30 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dna_alignment', '0002_sequencealignmentresult_query_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sequencealignmentresult',
            name='alignments',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
