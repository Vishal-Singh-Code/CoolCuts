from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve


urlpatterns = [
    path('' , views.index , name='index'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('user/' , include('user.urls')),
    path('manifest.json', serve, {'document_root': settings.BASE_DIR / 'frontend/build', 'path': 'manifest.json'}),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)