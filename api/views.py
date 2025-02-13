# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class SignUpView(APIView):
    def post(self, request):
        data = request.data
        try:
            # Vérification des champs nécessaires
            if 'email' not in data or 'password' not in data:
                raise ValidationError("Email et mot de passe sont requis")
            
            if 'first_name' not in data or 'last_name' not in data:
                raise ValidationError("Nom et prénom sont requis")

            # Création de l'utilisateur
            user = User.objects.create_user(
                username=data['email'],
                email=data['email'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name']
            )
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Erreur lors de la création de l\'utilisateur : ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authentifier l'utilisateur avec ses identifiants
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Créer le token JWT
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            # Optionnel : renvoyer également le token de rafraîchissement
            return Response({
                'access_token': access_token,
                'refresh_token': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Identifiants invalides'
            }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]  # Assure-toi que JWTAuthentication est activé

    def get(self, request):
        print("Headers reçus :", request.headers)  # Debug pour vérifier les headers
        
        # Vérification si l'utilisateur est authentifié
        if not request.user.is_authenticated:
            return Response({"error": "Utilisateur non authentifié"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Réponse avec les données de l'utilisateur
        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name
        })

