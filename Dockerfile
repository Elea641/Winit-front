# Utiliser une image node officielle basée sur Alpine
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer les dépendances nécessaires pour node-gyp, y compris Python et les outils de construction
RUN apk add --no-cache g++ make py3-pip

# Installer Angular CLI globalement
RUN npm install -g @angular/cli

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 4200
EXPOSE 4200

# Démarrer le serveur de développement Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
