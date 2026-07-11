from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('SHEETS', 'Roofing Sheets / IBR'),
        ('WIRE', 'Fencing & Wire Products'),
        ('INSULATION', 'Insulation & Membranes'),
        ('ACCESSORIES', 'Roofing Accessories'),
    ]

    name = models.CharField(max_length=255, help_text="e.g., Galvanised Wire, Barbed Wire")
    specification = models.CharField(
        max_length=150, 
        blank=True, 
        help_text="e.g., 2.0mm x 50kg, 800m x 1.8mm, 40m x 1.2m"
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='SHEETS')
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price in USD")
    price_note = models.CharField(
        max_length=100, 
        blank=True, 
        help_text="e.g., wholesale, per 10m roll, per meter"
    )
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        spec = f" ({self.specification})" if self.specification else ""
        return f"{self.name}{spec} - ${self.price}"
    
class PortfolioProject(models.Model):
    title = models.CharField(max_length=255, help_text="e.g., Residential Fix & Supply - Borrowdale")
    description = models.TextField(blank=True, help_text="Brief details about the materials used.")
    image = models.ImageField(upload_to='portfolio/')
    date_completed = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_completed', '-created_at']

    def __str__(self):
        return self.title