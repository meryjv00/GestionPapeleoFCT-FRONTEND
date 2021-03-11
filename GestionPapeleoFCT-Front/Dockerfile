 # Dockerfile
FROM node:14.15.4

ENV HOME=/usr/src/app
RUN mkdir $HOME
WORKDIR $HOME

COPY ./ /usr/src/app

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli && npm cache clean --force

# Puerto entorno dev
EXPOSE 4200