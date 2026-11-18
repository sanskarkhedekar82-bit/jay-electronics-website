
from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'email',
        'phone',
        'service',
        'status',
        'created_at',
    )

    list_filter = ('status', 'created_at')

    search_fields = (
        'name',
        'email',
        'phone',
        'service',
    )

    readonly_fields = ('created_at',)

    ordering = ('-created_at',)
