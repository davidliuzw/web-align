from django.urls import path
from django.contrib import admin
from django.urls import path
from .views.align_sequences_view import AlignSequencesView
from .views.login_view import LoginView
from .views.profile_view import ProfileView
from .views.user_register_view import UserRegisterView
from .views.result_detail_view import ResultDetailView


urlpatterns = [
    # path("", index, name="index"),
    path("align-sequences/", AlignSequencesView.as_view()),
    # path('admin/', admin.site.urls),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('register/', UserRegisterView.as_view()),
    path('result_detail/<uuid:query_number>/', ResultDetailView.as_view(), name='result_detail'),
]
