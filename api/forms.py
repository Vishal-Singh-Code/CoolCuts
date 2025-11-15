from django import forms
from .models import Appointment
from datetime import datetime, timedelta


def generate_time_slots(start_time, end_time, slot_duration):
    time_slots = []
    current_time = start_time
    while current_time < end_time:
        slot = current_time.strftime('%I:%M %p')
        time_slots.append((slot, slot))
        current_time += slot_duration
    return time_slots


def get_time_choices():
    start = datetime.strptime('09:00 AM', '%I:%M %p')
    end = datetime.strptime('09:00 PM', '%I:%M %p')
    duration = timedelta(hours=1)
    return generate_time_slots(start, end, duration)


class AppointmentForm(forms.ModelForm):
    appointment_time = forms.ChoiceField(
        choices=get_time_choices(),
        widget=forms.Select(),
        required=True
    )

    checklist = forms.CharField(widget=forms.HiddenInput(), required=False)

    class Meta:
        model = Appointment
        fields = ['customer_name', 'appointment_date', 'appointment_time', 'checklist']
        widgets = {
            'appointment_date': forms.DateInput(attrs={'type': 'date'}),
        }
        help_texts = {
            'appointment_time': 'Select a time slot.',
        }

    def clean_appointment_time(self):
        value = self.cleaned_data['appointment_time']
        try:
            return datetime.strptime(value, "%I:%M %p").time()
        except ValueError:
            raise forms.ValidationError("Invalid time format")
