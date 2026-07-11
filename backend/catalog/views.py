from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Product, PortfolioProject
from .serializers import ProductSerializer, PortfolioProjectSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(in_stock=True) # Only send in-stock items to the frontend by default
    serializer_class = ProductSerializer
    
    # Enable search and filtering so clients can easily find specific materials
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'category', 'specification']
    ordering_fields = ['price', 'name']

class PortfolioProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectSerializer