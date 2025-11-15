from rest_framework import serializers
from .models import Appointment , Service, ContactForm
from datetime import datetime 

class AppointmentSerializer(serializers.ModelSerializer):
    checklist = serializers.JSONField(required=False)
    appointment_time = serializers.CharField() 

    class Meta:
        model = Appointment
        fields = [
            'id', 'customer_name','phone', 'appointment_date',
            'appointment_time', 'checklist', 'status', 'booking_time'
        ]
        read_only_fields = ['customer_name']


    def validate_appointment_time(self, value):
        try:
            return datetime.strptime(value, '%I:%M %p').time()
        except ValueError:
            raise serializers.ValidationError("Time has wrong format. Use 'HH:MM AM/PM'.")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['appointment_time'] = instance.appointment_time.strftime("%I:%M %p")
        return data


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price']


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ['name', 'email', 'subject', 'message', 'created_at']
