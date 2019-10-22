from django.shortcuts import render
import json

# Create your views here.
def home_view(request):
    return render(request, "home.html", {"title": "Home"})


def pixi_view(request):
    json_data = open('./static/images/sprite-game.json')
    data1 = json.load(json_data)
    data2 = json.dumps(data1)
    json_data.close()
    return render(request, "pixi.html", {"title": "PIXI", "json": data2})
