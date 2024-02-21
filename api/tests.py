from django.test import TestCase
from django.utils import timezone
from django.db.models import Count, Q
from .models import Currency, EconomicEvent
from .views import count_event_outcomes
from .serializers import EconomicEventSerializer

class EconomicEventTestCase(TestCase):
    """
    Test case for the EconomicEvent model and related functions.
    """

    def setUp(self):
        """
        Set up test data for the EconomicEvent model.
        """
        # Create test currency
        self.currency = Currency.objects.create(code='USD')

        # Create test economic events
        self.event1 = EconomicEvent.objects.create(
            currency=self.currency,
            impact_level='L',
            release_date=timezone.now(),
            event_name='Test Event 1',
            forecast='50%',
            actual='60%',
            outcome='positive'
        )
        self.event2 = EconomicEvent.objects.create(
            currency=self.currency,
            impact_level='M',
            release_date=timezone.now(),
            event_name='Test Event 2',
            forecast='70%',
            actual='60%',
            outcome='negative'
        )

    def test_count_event_outcomes(self):
        """
        Test count_event_outcomes function.
        """
        start_date = timezone.now() - timezone.timedelta(days=1)
        end_date = timezone.now() + timezone.timedelta(days=1)
        currency_code = 'USD'

        # Test when there are events within the specified date range and currency
        counts = count_event_outcomes(start_date, end_date, currency_code)
        self.assertEqual(counts['positive_counts']['L'], 1)
        self.assertEqual(counts['negative_counts']['M'], 1)
        self.assertEqual(counts['neutral_counts']['L'], 0)
        self.assertEqual(counts['neutral_counts']['M'], 0)
        self.assertEqual(counts['neutral_counts']['H'], 0)

        # Test when there are no events within the specified date range and currency
        empty_counts = count_event_outcomes(start_date - timezone.timedelta(days=2),
                                            start_date - timezone.timedelta(days=1),
                                            currency_code)
        self.assertEqual(empty_counts['positive_counts']['L'], 0)
        self.assertEqual(empty_counts['negative_counts']['M'], 0)
        self.assertEqual(empty_counts['neutral_counts']['L'], 0)
        self.assertEqual(empty_counts['neutral_counts']['M'], 0)
        self.assertEqual(empty_counts['neutral_counts']['H'], 0)

class EconomicEventSerializerTestCase(TestCase):
    """
    Test case for the EconomicEventSerializer serializer.
    """

    def setUp(self):
        """
        Set up test data for the EconomicEventSerializer.
        """
        self.event_data = {
            'currency': 1,
            'impact_level': 'L',
            'release_date': '2022-01-01T00:00:00Z',
            'event_name': 'Test Event',
            'forecast': '50%',
            'actual': '60%',
            'outcome': 'positive'
        }

    def test_economic_event_serializer(self):
        """
        Test EconomicEventSerializer serializer.
        """
        serializer = EconomicEventSerializer(data=self.event_data)
        self.assertTrue(serializer.is_valid())

        # Create an EconomicEvent object using the serializer
        event = serializer.save()

        # Check that the serializer data matches the created object's data
        self.assertEqual(event.currency_id, self.event_data['currency'])
        self.assertEqual(event.impact_level, self.event_data['impact_level'])
        self.assertEqual(event.release_date.isoformat(), self.event_data['release_date'])
        self.assertEqual(event.event_name, self.event_data['event_name'])
        self.assertEqual(event.forecast, self.event_data['forecast'])
        self.assertEqual(event.actual, self.event_data['actual'])
        self.assertEqual(event.outcome, self.event_data['outcome'])