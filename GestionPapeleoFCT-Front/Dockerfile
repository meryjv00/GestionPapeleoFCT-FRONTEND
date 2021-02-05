# Dockerfile
FROM node

# Agregamos un usuario
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/usr/src/app
RUN mkdir $HOME
WORKDIR $HOME

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli && npm cache clean

# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153    
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152 

#docker run -ti --rm -v /home/daniel/Escritorio/DESAFIO3/PROYECTO/GestionPapeleoFCT-FRONTEND/GestionPapeleoFCT-Front:/usr/src/app -p4200:4200 -p49153:49153 -p9876:9876 -p49152:49152 despliegue-front2_client-angular bash