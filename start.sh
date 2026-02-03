#!/bin/bash

# Script para iniciar TrolleyCheck PWA rapidamente

echo "╔════════════════════════════════════════╗"
echo "║   🚀 TrolleyCheck PWA - Iniciador     ║"
echo "╚════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")" || exit 1

# Verificar dependências
if command -v node &> /dev/null; then
    echo "✅ Node.js detectado"
    echo ""
    echo "Iniciando servidor..."
    echo ""
    node server.js
    exit 0
fi

if command -v python3 &> /dev/null; then
    echo "⚠️ Node.js não encontrado, usando Python 3"
    echo ""
    echo "Iniciando servidor..."
    echo ""
    echo "📱 Aceda a http://localhost:3000"
    echo ""
    python3 -m http.server 3000
    exit 0
fi

if command -v python &> /dev/null; then
    echo "⚠️ Node.js não encontrado, usando Python"
    echo ""
    echo "Iniciando servidor..."
    echo ""
    echo "📱 Aceda a http://localhost:3000"
    echo ""
    python -m SimpleHTTPServer 3000
    exit 0
fi

if command -v php &> /dev/null; then
    echo "⚠️ Node.js não encontrado, usando PHP"
    echo ""
    echo "Iniciando servidor..."
    echo ""
    echo "📱 Aceda a http://localhost:3000"
    echo ""
    php -S localhost:3000
    exit 0
fi

echo "❌ Nenhum servidor disponível!"
echo ""
echo "Por favor, instale um dos seguintes:"
echo "  • Node.js: https://nodejs.org"
echo "  • Python: https://www.python.org"
echo "  • PHP: https://www.php.net"
exit 1
