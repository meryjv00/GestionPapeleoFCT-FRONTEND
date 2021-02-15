#Crea la imagen
docker-compose down
docker-compose build

#Construye el contenedor e inicia el servicio de angular dentro de éste
docker run --rm --name clienteFCTDesarrollo -itd -v "$PWD":/usr/src/app -p4200:4200 gestionpapeleofct-front_client-angular bash
docker exec clienteFCTDesarrollo npm install
docker exec clienteFCTDesarrollo ng serve --host 0.0.0.0 --poll=2000