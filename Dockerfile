# Use a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de definições de dependências para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação para o contêiner
COPY . .

# Expõe a porta que a aplicação vai usar
EXPOSE 3000

# Define o comando para iniciar a aplicação
CMD ["npm", "run", "start"]
