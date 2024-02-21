from django.db import models

class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)

class EconomicEvent(models.Model):
    IMPACT_CHOICES = (
        ('L', 'Low Impact'),
        ('M', 'Moderate Impact'),
        ('H', 'High Impact'),
    )
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    impact_level = models.CharField(max_length=1, choices=IMPACT_CHOICES)
    release_date = models.DateTimeField()
    event_name = models.CharField(max_length=100)
    forecast = models.CharField(max_length=20, blank=True, null=True)  # Some forecasts are not available in the sample data
    actual = models.CharField(max_length=20, blank=True, null=True)  # Some actual values are not available in the sample data
    outcome = models.CharField(max_length=10)  # positive, negative, neutral

    def save(self, *args, **kwargs):
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
        
        # If impact level is not specified, set it to None
        if not self.impact_level:
            self.impact_level = None
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.event_name} - {self.release_date}"