# Dockerfile
FROM node:14.15.4

# Agregamos un usuario
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/usr/src/app
RUN mkdir $HOME
WORKDIR $HOME

# Instalamos angular cli en nuestra imágen
RUN npm install -g @angular/cli && npm cache clean --force

# Puerto entorno dev
EXPOSE 4200
