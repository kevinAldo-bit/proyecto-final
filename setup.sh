#!/bin/bash

# 🎮 Script de configuración rápida para Plataforma Gamer 2.0

echo "════════════════════════════════════════════════════════════"
echo "🎮 PLATAFORMA GAMER 2.0 - SCRIPT DE INSTALACIÓN"
echo "════════════════════════════════════════════════════════════"
echo ""

# Colores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Instalación Backend
echo -e "${CYAN}📦 Instalando dependencias del Backend...${NC}"
cd backend
npm install 2>&1 | tail -10
echo -e "${GREEN}✅ Backend configurado${NC}"
echo ""

# Volver al directorio principal
cd ..

# Instalación Frontend
echo -e "${CYAN}📦 Instalando dependencias del Frontend...${NC}"
echo -e "${YELLOW}Esto puede tomar unos minutos...${NC}"
cd frontend
npm install 2>&1 | tail -10
echo -e "${GREEN}✅ Frontend configurado${NC}"
echo ""

# Volver al directorio principal
cd ..

echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}✨ ¡INSTALACIÓN COMPLETADA!${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo -e "${CYAN}🚀 PRÓXIMOS PASOS:${NC}"
echo ""
echo -e "${YELLOW}Terminal 1 - Backend:${NC}"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2 - Frontend:${NC}"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo -e "${CYAN}Accede a: http://localhost:5173${NC}"
echo ""
echo "════════════════════════════════════════════════════════════"
