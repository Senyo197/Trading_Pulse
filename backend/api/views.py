from django.db.models import Count
from .models import EconomicEvent

def count_event_outcomes(start_date, end_date, currency_code):
    # Query the EconomicEvent model to count positive, negative, and neutral outcomes
    event_count = EconomicEvent.objects.filter(
        release_date__range=(start_date, end_date),
        currency__code=currency_code,
    ).aggregate(
        positive_count=Count('id', filter=models.Q(outcome='positive')),
        negative_count=Count('id', filter=models.Q(outcome='negative')),
        neutral_count=Count('id', filter=models.Q(outcome='neutral')),
    )

    # Extract counts from the aggregated result
    positive_count = event_count.get('positive_count', 0)
    negative_count = event_count.get('negative_count', 0)
    neutral_count = event_count.get('neutral_count', 0)

    return {
        'positive_count': positive_count,
        'negative_count': negative_count,
        'neutral_count': neutral_count,
    }