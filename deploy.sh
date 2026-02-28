#!/bin/bash
# ==========================================================
# deploy.sh — Script de deploy do Filla SaaS com Traefik
# ==========================================================
# Uso: bash deploy.sh
# ==========================================================
set -e

echo "🚀 Iniciando deploy do Filla SaaS..."

# 1. Cria a rede externa do Traefik (ignora erro se já existir)
echo "📡 Criando rede traefik-net (se não existir)..."
docker network create traefik-net 2>/dev/null || echo "   rede traefik-net já existe, ok."

# 2. Garante que o acme.json existe com as permissões corretas
echo "🔐 Configurando traefik/acme.json..."
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

# 3. Cria o .env a partir do .env.example se ainda não existir
if [ ! -f ".env" ]; then
  echo "⚙️  Arquivo .env não encontrado. Copiando de .env.example..."
  cp .env.example .env
  echo ""
  echo "⚠️  ATENÇÃO: Edite o arquivo .env com seus dados reais antes de continuar!"
  echo "   nano .env"
  exit 1
fi

# 4. Build e subida dos containers
echo "🐳 Fazendo build e subindo containers..."
docker compose pull traefik
docker compose up -d --build

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "Serviços rodando:"
docker compose ps
echo ""
echo "📋 Logs em tempo real:"
echo "   docker compose logs -f traefik"
echo "   docker compose logs -f backend"
echo "   docker compose logs -f frontend"
