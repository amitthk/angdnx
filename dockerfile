FROM debian:jessie

RUN apt-get update



RUN apt-get -y install sudo git curl python gettext libunwind8 libcurl3 build-essential ca-certificates
RUN curl -o libicu52_52.1-8ubuntu0.2_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/i/icu/libicu52_52.1-8ubuntu0.2_amd64.deb
RUN dpkg -i libicu52_52.1-8ubuntu0.2_amd64.deb

# Install Node.js
RUN mkdir /nodejs && \
    curl http://nodejs.org/dist/v5.11.0/node-v5.11.0-linux-x64.tar.gz | \
    tar xvzf - -C /nodejs --strip-components=1

ENV PATH $PATH:/nodejs/bin
RUN npm set registry http://registry.npmjs.org
RUN npm install -g typescript tslint typings yo bower grunt-cli gulp

RUN curl -sSL -o dotnet.tar.gz https://go.microsoft.com/fwlink/?LinkID=827530
RUN mkdir -p /opt/dotnet && tar zxf dotnet.tar.gz -C /opt/dotnet
RUN ln -s /opt/dotnet/dotnet /usr/local/bin

RUN mkdir /app

#RUN git init; git remote add github https://github.com/amitthk/angdnx.git; git pull github master
COPY . /app



WORKDIR /app/angdnx
RUN npm install; typings install
RUN tsc

WORKDIR /app
RUN ["dotnet", "restore"]

WORKDIR /app/angdnx
RUN ["gulp"]
RUN ["dotnet", "build"]
 
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
 
ENTRYPOINT ["dotnet", "run"]