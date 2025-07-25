from api.views import createUserView
from api.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView  # ← FALTABA ESTA IMPORTACIÓN
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/register/', createUserView.as_view(), name='create_user'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api-auth/", include("rest_framework.urls")),
    path('api/', include('api.urls')),
]
