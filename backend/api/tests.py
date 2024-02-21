import unittest
from datetime import datetime
from django.utils import timezone
from .models import Currency, EconomicEvent
from .views import count_event_outcomes

class TestCountEventOutcomes(unittest.TestCase):
    def setUp(self):
        # Create some test data
        self.currency = Currency.objects.create(code='USD')
        EconomicEvent.objects.create(currency=self.currency, impact_level='H', release_date=timezone.now(), event_name='Test Event', forecast='100%', actual='110%', outcome='positive')
        EconomicEvent.objects.create(currency=self.currency, impact_level='M', release_date=timezone.now(), event_name='Test Event', forecast='100%', actual='90%', outcome='negative')
        EconomicEvent.objects.create(currency=self.currency, impact_level='L', release_date=timezone.now(), event_name='Test Event', forecast='100%', actual='100%', outcome='neutral')

    def test_count_event_outcomes(self):
        # Test counting events for positive outcome
        positive_count = count_event_outcomes(start_date=timezone.now(), end_date=timezone.now(), currency_code='USD')['positive_count']
        self.assertEqual(positive_count, 1)

        # Test counting events for negative outcome
        negative_count = count_event_outcomes(start_date=timezone.now(), end_date=timezone.now(), currency_code='USD')['negative_count']
        self.assertEqual(negative_count, 1)

        # Test counting events for neutral outcome
        neutral_count = count_event_outcomes(start_date=timezone.now(), end_date=timezone.now(), currency_code='USD')['neutral_count']
        self.assertEqual(neutral_count, 1)

        # Test counting events for unknown outcome (when impact level is not available)
        unknown_count = count_event_outcomes(start_date=timezone.now(), end_date=timezone.now(), currency_code='USD')['unknown_count']
        self.assertEqual(unknown_count, 0)

if __name__ == '__main__':
    unittest.main()