from django.shortcuts import render
import json

# Create your views here.
def home_view(request):
    return render(request, "home.html", {"title": "Home"})

def portfolio_view(request):
    return render(request, "portfolio.html", {"title": "Portfolio"})

def filter_effect_view(request):
    return render(request, "filter_effect.html", {"title": "Filter Effect"})

def sprite_game_view(request):
    game = open('./static/images/sprite-game.json')
    game_data1 = json.load(game)
    game_data2 = json.dumps(game_data1)
    game.close()

    bigguy = open('./static/images/sprite/bigguy.json')
    bigguy_data1 = json.load(bigguy)
    bigguy_data2 = json.dumps(bigguy_data1)
    bigguy.close()

    bombguy = open('./static/images/sprite/bombguy.json')
    bombguy_data1 = json.load(bombguy)
    bombguy_data2 = json.dumps(bombguy_data1)
    bombguy.close()

    captain = open('./static/images/sprite/captain.json')
    captain_data1 = json.load(captain)
    captain_data2 = json.dumps(captain_data1)
    captain.close()

    cucumber = open('./static/images/sprite/cucumber.json')
    cucumber_data1 = json.load(cucumber)
    cucumber_data2 = json.dumps(cucumber_data1)
    cucumber.close()

    pirate = open('./static/images/sprite/pirate.json')
    pirate_data1 = json.load(pirate)
    pirate_data2 = json.dumps(pirate_data1)
    pirate.close()

    whale = open('./static/images/sprite/whale.json')
    whale_data1 = json.load(whale)
    whale_data2 = json.dumps(whale_data1)
    whale.close()

    context = {"title": "Sprite Game", "game": game_data2, "bigguy": bigguy_data2,
            "bombguy": bombguy_data2, "captain": captain_data2,
            "cucumber": cucumber_data2, "pirate": pirate_data2, "whale": whale_data2}

    return render(request, "sprite_game.html", context)
