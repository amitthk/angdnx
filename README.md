# Asp.Net Core RC2 web-api and Angular 2 Cross Platfrom - Getting Started on Linux/Mac/Windows & VSCode Part-1

This is the source code for the article titled as above at codeproject:-
[Asp.Net Core RC2 web-api and Angular 2 Cross Platfrom - Getting Started on Linux/Mac/Windows & VSCode Part-1](http://www.codeproject.com/Articles/1103010/Asp-Net-Core-RC-web-api-and-Angular-Cross-Platfrom)

Follow the following commands to build and run this app:-

------------------
```
mkdir testapp
cd testapp


git init
git remote add origin https://github.com/amitthk/angdnx.git
git pull origin master

dotnet restore

cd angdnx

npm install

cd app
tsc

cd ..
gulp

dotnet build
dotnet run
```
-----------------

Following video demostrates the above commands :-
<a href="http://www.youtube.com/watch?feature=player_embedded&v=GkARDwOTCfw" target="_blank"><img src="http://img.youtube.com/vi/GkARDwOTCfw/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

