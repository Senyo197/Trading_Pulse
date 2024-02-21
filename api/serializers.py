from rest_framework import serializers
from .models import EconomicEvent

class EconomicEventSerializer(serializers.ModelSerializer):
    """
    Serializer for the EconomicEvent model.
    """
    class Meta:
        model = EconomicEvent
        fields = '__all__'  # You can specify the fields you want to include if you don't want all fields

    def to_representation(self, instance):
        """
        Convert the economic event instance to its serialized representation.

        You can implement custom serialization logic here if needed.
        """
        data = super().to_representation(instance)
        return data