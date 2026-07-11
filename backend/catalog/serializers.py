from rest_framework import serializers
from .models import Product, PortfolioProject

class ProductSerializer(serializers.ModelSerializer):
    # We can add custom fields here later if needed (e.g., formatting the price with a currency symbol)
    class Meta:
        model = Product
        fields = [
            'id', 
            'name', 
            'specification', 
            'category', 
            'price', 
            'price_note', 
            'image', 
            'in_stock'
        ]

class PortfolioProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioProject
        fields = ['id', 'title', 'description', 'image', 'date_completed']