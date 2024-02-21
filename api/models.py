from django.db import models

class Currency(models.Model):
    """
    Model representing a currency with its code.
    """
    code = models.CharField(max_length=3, unique=True)

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
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    impact_level = models.CharField(
        max_length=1,
        choices=IMPACT_CHOICES,
        help_text="The impact level of the economic event."
    )
    release_date = models.DateTimeField(help_text="The release date of the economic event.")
    event_name = models.CharField(
        max_length=100,
        help_text="The name of the economic event."
    )
    forecast = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="The forecasted value of the economic event."
    )
    actual = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="The actual value of the economic event."
    )
    outcome = models.CharField(
        max_length=10,
        help_text="The outcome of the economic event (positive, negative, neutral, unknown)."
    )

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
            self.outcome = 'unknown'
        
        if not self.impact_level:
            self.impact_level = None
        
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Return a string representation of the economic event.
        """
        return f"{self.event_name} - {self.release_date}"