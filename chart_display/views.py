from django.shortcuts import render
from api.views import EconomicEventListView
def EconomicEventChartView(request):
    """
    View function for displaying a chart of economic events.

    This view fetches data from the EconomicEventListView API endpoint and renders it in a chart display template.

    Args:
        request: HttpRequest object representing the HTTP request.

    Returns:
        HttpResponse: Rendered HTML template with economic event data or an error template in case of failure.
    """
    response = EconomicEventListView.as_view()(request)
    
    if response.status_code == 200:
        data = response.data  
        return render(request, 'chart_display/economic_events_chart.html', {'data': data})
    else:
        return render(request, 'chart_display/error.html')
