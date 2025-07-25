from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.createUserView.as_view(), name='create_user'),
    path('notes/', views.NoteListCreate.as_view(), name='note_list'),
    path('notes/<int:pk>/', views.NoteRetrieveUpdateDestroy.as_view(), name='note_detail'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='note_delete'),
]
