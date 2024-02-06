from django.apps import AppConfig

class DnaAlignmentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dna_alignment'

    def ready(self):
        import dna_alignment.signals
