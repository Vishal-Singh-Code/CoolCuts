from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentListView, AppointmentDetailView, ServiceViewSet, AppointmentHistoryView, contact_form

# Create the router and register the viewsets
router = DefaultRouter()
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('user/appointments/', AppointmentHistoryView.as_view(), name='appointment-history'),
    path('contact/', contact_form, name='contact_form'),
]
