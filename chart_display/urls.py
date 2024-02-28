from django.urls import path
from . import views

urlpatterns = [
    path('economic-events/', views.EconomicEventChartView.as_view(), name='economic_events_chart'),
]