from django.shortcuts import render

# Create your views here.
def profile_detail_view(request, username, *args, **kwargs):
    #get the profile data
    return render(request, "profiles/detail.html", {"username": username})