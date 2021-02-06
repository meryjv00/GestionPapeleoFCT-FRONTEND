#Crea la imagen
docker-compose down
docker-compose build

#Construye el contenedor e inicia el servicio de angular dentro de éste
docker run --rm --name clientee -i -v "$PWD":/usr/src/app -p4200:4200 -p49153:49153 -p9876:9876 -p49152:49152 gestionpapeleofct-front_client-angular bash
docker exec clientee ng serve --host 0.0.0.0 --poll=2000