from django.contrib import admin
from .models import Product, PortfolioProject

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'specification', 'category', 'price', 'price_note', 'in_stock', 'updated_at')
    list_filter = ('category', 'in_stock')
    search_fields = ('name', 'specification')
    list_editable = ('price', 'price_note', 'in_stock')  # Allows rapid updates directly from the list view

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_completed', 'created_at')
    search_fields = ('title',)