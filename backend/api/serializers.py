from rest_framework import serializers
from .models import EconomicEvent

class EconomicEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicEvent
        fields = '__all__'  # You can specify the fields you want to include if you don't want all fields

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # If you need any custom serialization logic, you can implement it here
        return data