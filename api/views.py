from rest_framework import generics, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Appointment, Service
from .serializers import AppointmentSerializer, ServiceSerializer, ContactFormSerializer


# ---------------------------------------------------
# Appointment List + Create
# ---------------------------------------------------
class AppointmentListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user

        # If admin/staff → return all appointments
        if user.is_staff or user.is_superuser:
            return Appointment.objects.all()

        # Normal users → only see their own
        return Appointment.objects.filter(user=user)


    def perform_create(self, serializer):
        appointment_date = serializer.validated_data["appointment_date"]
        appointment_time = serializer.validated_data["appointment_time"]

        # Check time conflict
        if Appointment.objects.filter(
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            user=self.request.user
        ).exists():
            raise ValidationError("This time slot is already booked.")

        # Auto-fill customer name from logged-in user
        full_name = f"{self.request.user.first_name} {self.request.user.last_name}".strip()

        serializer.save(
            user=self.request.user,
            customer_name=full_name
        )


# ---------------------------------------------------
# Appointment Detail (Retrieve, Update, Delete)
# ---------------------------------------------------
class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        
        # Admin can see/update/delete any appointment
        if user.is_staff or user.is_superuser:
            return Appointment.objects.all()
        
        # Normal user only their own
        return Appointment.objects.filter(user=user)

    def perform_update(self, serializer):
        instance = self.get_object()
        user = self.request.user

        appointment_date = serializer.validated_data.get("appointment_date", instance.appointment_date)
        appointment_time = serializer.validated_data.get("appointment_time", instance.appointment_time)

        # Build query excluding the current record
        queryset = Appointment.objects.exclude(pk=instance.pk)

        # Normal user should only check conflicts with their own appointments
        if not user.is_staff and not user.is_superuser:
            queryset = queryset.filter(user=user)

        # Check conflict
        if queryset.filter(appointment_date=appointment_date, appointment_time=appointment_time).exists():
            raise ValidationError("This time slot is already booked.")

        serializer.save()



# ---------------------------------------------------
# Appointment History
# ---------------------------------------------------
class AppointmentHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        appointments = Appointment.objects.filter(user=request.user)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)


# ---------------------------------------------------
# Service ViewSet (Admin Only for Write)
# ---------------------------------------------------
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAdminUser()]
        return []  # GET allowed for all users


# ---------------------------------------------------
# Contact Form (Public)
# ---------------------------------------------------
@api_view(["POST"])
def contact_form(request):
    serializer = ContactFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Contact form submitted successfully!"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
