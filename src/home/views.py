from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, "home.html", {"title": "Home"})


def pixi_view(request, *args, **kwargs):
    return render(request, "pixi.html", {"title": "PIXI"})
