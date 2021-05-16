FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY *.sln ./
COPY RxPlantManager/*.csproj ./RxPlantManager/
RUN dotnet restore

COPY RxPlantManager/. ./RxPlantManager/

WORKDIR /app/RxPlantManager
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app

COPY --from=build-env /app/RxPlantManager/out .

# Padrão de container ASP.NET
# ENTRYPOINT [ "dotnet", "RxPlantManager.dll" ]

# Opção utilizada pelo Heroku
CMD ASPNETCORE_URLS=http://*:$PORT dotnet RxPlantManager.dll