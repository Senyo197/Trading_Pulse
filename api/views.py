from django.db.models import Count
from .models import EconomicEvent

def count_event_outcomes(start_date, end_date, currency_code):
    """
    Count the number of economic event outcomes (positive, negative, neutral)
    within a specified date range and for a given currency code.

    Args:
        start_date (datetime): The start date of the range.
        end_date (datetime): The end date of the range.
        currency_code (str): The code of the currency to filter events.

    Returns:
        dict: A dictionary containing counts for positive, negative, and neutral outcomes.
              Example: {'positive_count': 10, 'negative_count': 5, 'neutral_count': 3}
    """
    # Query the EconomicEvent model to count positive, negative, and neutral outcomes
    event_counts = EconomicEvent.objects.filter(
        release_date__range=(start_date, end_date),
        currency__code=currency_code,
    ).values('impact_level').annotate(
        positive_count=Count('id', filter=models.Q(outcome='positive')),
        negative_count=Count('id', filter=models.Q(outcome='negative')),
        neutral_count=Count('id', filter=models.Q(outcome='neutral')),
    )

    # Initialize counts for each impact level
    positive_counts = {'L': 0, 'M': 0, 'H': 0}
    negative_counts = {'L': 0, 'M': 0, 'H': 0}
    neutral_counts = {'L': 0, 'M': 0, 'H': 0}

    # Extract counts for each impact level
    for event_count in event_counts:
        impact_level = event_count['impact_level']
        positive_counts[impact_level] = event_count.get('positive_count', 0)
        negative_counts[impact_level] = event_count.get('negative_count', 0)
        neutral_counts[impact_level] = event_count.get('neutral_count', 0)

    return {
        'positive_counts': positive_counts,
        'negative_counts': negative_counts,
        'neutral_counts': neutral_counts,
    }