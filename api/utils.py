import csv
from datetime import datetime
from .models import EconomicEvent

def import_economic_data_from_csv(file_path):
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            # Assuming the CSV file has columns like currency, impact_level, release_date, event_name, forecast, actual, outcome
            currency = row['currency']
            impact_level = row['impact_level']
            release_date = datetime.strptime(row['release_date'], '%Y-%m-%d').date()
            event_name = row['event_name']
            forecast = row['forecast']
            actual = row['actual']
            outcome = row['outcome']

            # Create and save EconomicEvent instance
            event = EconomicEvent.objects.create(
                currency=currency,
                impact_level=impact_level,
                release_date=release_date,
                event_name=event_name,
                forecast=forecast,
                actual=actual,
                outcome=outcome
            )