from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EconomicEvent
from .serializers import EconomicEventSerializer

class EconomicEventListView(APIView):
    """
    API endpoint for retrieving filtered EconomicEvent instances.

    Accepts GET requests with query parameters for currency and impact level
    to filter EconomicEvent instances and returns them as JSON.
    """
    def get(self, request, format=None):
        # Retrieve query parameters
        currency = request.query_params.get('currency')
        impact_level = request.query_params.get('impact_level')

        # Filter events based on provided parameters using the model's filter_events method
        events = EconomicEvent.filter_events(currency, impact_level)

        # Serialize and return the filtered events
        serializer = EconomicEventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



"""
class EconomicEventListView(generics.ListAPIView):
    
    API endpoint for listing EconomicEvent instances.

    Retrieves a list of EconomicEvent instances and serializes them using EconomicEventSerializer.
    
    queryset = EconomicEvent.objects.all()
    serializer_class = EconomicEventSerializer

    
"""