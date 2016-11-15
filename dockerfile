FROM debian:jessie

RUN apt-get update



RUN apt-get -y install git libunwind8 libcurl3 build-essential
RUN apt-get -y install nodejs

RUN apt-get -y install curl libunwind8 gettext 
RUN curl -sSL -o dotnet.tar.gz https://go.microsoft.com/fwlink/?LinkID=827530
RUN mkdir -p /opt/dotnet && tar zxf dotnet.tar.gz -C /opt/dotnet
ln -s /opt/dotnet/dotnet /usr/local/bin

COPY . /app
WORKDIR /app


RUN ["dotnet", "restore"]
RUN ["cd", "angdnx"]
RUN ["npm", "install"]
RUN ["gulp"]
RUN ["dotnet", "build"]
 
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
 
ENTRYPOINT ["dotnet", "run"]