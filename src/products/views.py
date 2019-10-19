from django.shortcuts import render
from .forms import ProductForm
from .models import Product


# Create your views here.
def product_create_view(request):
    form = ProductForm(request.POST or None)
    if form.is_valid():
        form.save()

    context = {
        'form': form
    }
    return render(request, "products/product_create.html", context)

