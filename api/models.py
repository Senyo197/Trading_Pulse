from django.db import models

class EconomicEvent(models.Model):
    """
    Model representing an economic event.

    An economic event includes information such as currency, impact level,
    release date, event name, forecast, actual value, and outcome.

    The outcome is automatically determined based on the forecast and actual values.
    """
    IMPACT_CHOICES = (
        ('L', 'Low Impact'),
        ('M', 'Moderate Impact'),
        ('H', 'High Impact'),
    )
    currency = models.CharField(max_length=3, unique=True)
    impact_level = models.CharField(
        max_length=1,
        choices=IMPACT_CHOICES,
        null=True,
        blank=True
    )
    release_date = models.DateTimeField()
    event_name = models.CharField(max_length=100)
    forecast = models.CharField(max_length=20, blank=True, null=True)
    previous = models.CharField(max_length=20, blank=True, null=True)
    actual = models.CharField(max_length=20, blank=True, null=True)
    outcome = models.CharField(max_length=10, blank=True, null=True)

    def save(self, *args, **kwargs):
        """
        Override the save method to automatically determine the outcome based on forecast and actual values.
        """
        if self.forecast and self.actual:
            forecast_value = float(self.forecast.strip('%'))
            actual_value = float(self.actual.strip('%'))
            if forecast_value < actual_value:
                self.outcome = 'positive'
            elif forecast_value > actual_value:
                self.outcome = 'negative'
            else:
                self.outcome = 'neutral'
        else:
            self.outcome = None
        
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Return a string representation of the economic event.
        """
        return f"{self.event_name} - {self.release_date}"

"""
Retrieve all EconomicEvent instances for a specific currency and its imapct level
"""
aud_low_impact_events = EconomicEvent.objects.filter(currency='AUD', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
aud_moderate_impact_events = EconomicEvent.objects.filter(currency='AUD', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
aud_high_impact_events = EconomicEvent.objects.filter(currency='AUD', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

cad_low_impact_events = EconomicEvent.objects.filter(currency='CAD', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
cad_moderate_impact_events = EconomicEvent.objects.filter(currency='CAD', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
cad_high_impact_events = EconomicEvent.objects.filter(currency='CAD', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

chf_low_impact_events = EconomicEvent.objects.filter(currency='CHF', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
chf_moderate_impact_events = EconomicEvent.objects.filter(currency='CHF', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
chf_high_impact_events = EconomicEvent.objects.filter(currency='CHF', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

cny_low_impact_events = EconomicEvent.objects.filter(currency='CNY', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
cny_moderate_impact_events = EconomicEvent.objects.filter(currency='CNY', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
cny_high_impact_events = EconomicEvent.objects.filter(currency='CNY', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

eur_low_impact_events = EconomicEvent.objects.filter(currency='EUR', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
eur_moderate_impact_events = EconomicEvent.objects.filter(currency='EUR', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
eur_high_impact_events = EconomicEvent.objects.filter(currency='EUR', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

gbp_low_impact_events = EconomicEvent.objects.filter(currency='GBP', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
gbp_moderate_impact_events = EconomicEvent.objects.filter(currency='GBP', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
gbp_high_impact_events = EconomicEvent.objects.filter(currency='GBP', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

jpy_low_impact_events = EconomicEvent.objects.filter(currency='JPY', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
jpy_moderate_impact_events = EconomicEvent.objects.filter(currency='JPY', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
jpy_high_impact_events = EconomicEvent.objects.filter(currency='JPY', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

nzd_low_impact_events = EconomicEvent.objects.filter(currency='NZD', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
nzd_moderate_impact_events = EconomicEvent.objects.filter(currency='NZD', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
nzd_high_impact_events = EconomicEvent.objects.filter(currency='NZD', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])

usd_low_impact_events = EconomicEvent.objects.filter(currency='USD', impact_level='L', outcome__in=['positive', 'negative', 'neutral'])
usd_moderate_impact_events = EconomicEvent.objects.filter(currency='USD', impact_level='M', outcome__in=['positive', 'negative', 'neutral'])
usd_high_impact_events = EconomicEvent.objects.filter(currency='USD', impact_level='H', outcome__in=['positive', 'negative', 'neutral'])