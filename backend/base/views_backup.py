from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Product
from django.contrib.auth.models import User

from .products import products
from .serializer import ProductSerializer , UserSerializer , UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

from rest_framework import status

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username']=self.user.username
        # data['email'] = self.user.email

        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k]=v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# @api_view(['GET'])
# def getRoutes(request):
#     routes=[
#         '/api/products/',
#         '/api/products/create/',
#         '/api/products/upload/',
#         '/api/products/<id>/reviews/',
#         '/api/products/top/',
#         '/api/products/<id>/',
#         '/api/products/delete/<id>',
#         '/api/products/<update>/<id>',
#     ]
#     return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer =  ProductSerializer(product,many=False)
    # product=None
    # for i in products:
    #     if i['_id'] == pk:
    #         product=i
    #         break

    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    # print('DATA:', data)
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['name'],
            email= data['email'],
            password=make_password(data['password']),)

        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this username already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    Users = User.objects.all()
    serializer = UserSerializer(Users,many=True)
    return Response(serializer.data)
