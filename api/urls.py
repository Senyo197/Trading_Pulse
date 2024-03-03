from django.urls import path
from . import views

urlpatterns = [
    path('api/economic-events/', views.EconomicEventListView.as_view(), name='economic-event-api'),
]
