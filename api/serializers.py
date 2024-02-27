from rest_framework import serializers
from .models import EconomicEvent

class EconomicEventSerializer(serializers.ModelSerializer):
    """
    Serializer for the EconomicEvent model.

    Serializes EconomicEvent instances into JSON format for API responses.
    """
    release_date = serializers.DateField(format="%Y-%m-%d")

    class Meta:
        model = EconomicEvent
        fields = '__all__'

    def to_representation(self, instance):
        """
        Convert the economic event instance to its serialized representation.

        You can implement custom serialization logic here if needed.
        """
        data = super().to_representation(instance)
        return data


"""
class EconomicEventListView(generics.ListAPIView):
    
    API endpoint for listing EconomicEvent instances.

    Retrieves a list of EconomicEvent instances and serializes them using EconomicEventSerializer.
    
    queryset = EconomicEvent.objects.all()
    serializer_class = EconomicEventSerializer

    
"""