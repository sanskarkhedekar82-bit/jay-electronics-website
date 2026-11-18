
from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
from .models import Enquiry


def home(request):
    return render(request, 'index.html')


def submit_enquiry(request):

    if request.method == 'POST':

        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        service = request.POST.get('service', '').strip()
        message = request.POST.get('message', '').strip()

        if not all([name, email, phone, service, message]):
            messages.error(request, 'Please fill in all fields.')
            return redirect('/#contact')

        try:
            enquiry = Enquiry.objects.create(
                name=name,
                email=email,
                phone=phone,
                service=service,
                message=message
            )

            subject = f'New Enquiry from {name}'

            email_message = f"""
You have received a new enquiry from your website.

Name: {name}
Email: {email}
Phone: {phone}
Service: {service}

Message:
{message}
"""

            try:
                send_mail(
                    subject,
                    email_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_EMAIL],
                    fail_silently=False,
                )

                messages.success(
                    request,
                    'Your enquiry has been submitted successfully!'
                )

            except Exception:
                messages.warning(
                    request,
                    'Your enquiry was saved, but the email notification could not be sent.'
                )

        except Exception:
            messages.error(
                request,
                'Something went wrong. Please try again.'
            )

        return redirect('/#contact')

    return redirect('/#contact')
