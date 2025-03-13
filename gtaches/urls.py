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
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from authentication.views import get_user_info

urlpatterns = [
    path('auth/', include('authentication.urls_auth')),
    path('', include('authentication.urls_profiles')),
    path('', include('gtachesapp.urls_projects')),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-info/', get_user_info, name='user-info')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
