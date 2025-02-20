"""
URL configuration for gtaches project.

The `urlpatterns` list routes URLs to students_views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function students_views
    1. Add an import:  from my_app import students_views
    2. Add a URL to urlpatterns:  path('', students_views.home, name='home')
Class-based students_views
    1. Add an import:  from other_app.students_views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('auth/', include('authentication.urls_auth')),  # Remplacez `app_name` par le nom de votre application
    path('', include('authentication.urls_profiles')),
    path('', include('gtachesapp.urls_projects')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
