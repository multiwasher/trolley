# 🚀 Como Executar o TrolleyCheck PWA

## ⚡ Opção 1: Node.js (Recomendado)

```bash
cd /workspaces/trolley
node server.js
```

Depois abra: **http://localhost:3000**

## 🐍 Opção 2: Python

```bash
cd /workspaces/trolley

# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Depois abra: **http://localhost:3000**

## 🔌 Opção 3: PHP

```bash
cd /workspaces/trolley
php -S localhost:3000
```

Depois abra: **http://localhost:3000**

## 📱 Opção 4: VS Code Live Preview (Alternativa)

1. Abra `index.html` no VS Code
2. Clique no ícone de Preview (lado direito)
3. Escolha "Preview in External Browser"

⚠️ **Nota:** Live Preview pode ter problemas de CORS com manifest.json. Use Node.js para melhor experiência.

---

## 🧪 Testes Disponíveis

### Teste PWA
http://localhost:3000/test-pwa.html

Verifica:
- ✅ Service Worker
- ✅ Manifest.json
- ✅ beforeinstallprompt
- ✅ Estado da instalação

### Debug Firebase
http://localhost:3000/debug-firebase.html

Verifica:
- ✅ Conexão Firebase
- ✅ Autenticação
- ✅ Leitura de dados
- ✅ Permissões Firestore

---

## 🐛 Se Continuar com Erros

### Erro: "WebSocket connection failed"
- Isto é apenas o Live Preview do VS Code
- Não afecta a app - é apenas para auto-refresh
- Use Node.js para evitar

### Erro: "manifest.json 503"
- Servidor Node.js corrige isto automaticamente
- O .htaccess pode não estar activado (Apache)
- Use `node server.js` para solução definitiva

### Erro: "CORS policy"
- Confirmado que está resolvido no servidor Node.js
- Se ainda aparecer, limpe cache do browser (Ctrl+Shift+Delete)

---

## 🎯 Fluxo de Instalação

### Desktop (Chrome/Edge/Firefox)
1. Aceda a http://localhost:3000
2. Clique em ⬇️ (canto superior direito)
3. Clique "Instalar no Dispositivo"
4. Confirme no diálogo

### Mobile Android (Chrome)
1. Aceda a http://localhost:3000 no Chrome
2. Toque em ⬇️ (canto superior direito)
3. Toque "Instalar no Dispositivo"
4. Confirme

### iOS (Safari)
1. Abra em Safari
2. Toque em Partilhar (↑)
3. Toque "Adicionar ao Ecrã Principal"
4. Escolha nome e toque "Adicionar"

---

## 📊 Estrutura de Ficheiros

```
/workspaces/trolley/
├── index.html          ← App principal
├── manifest.json       ← Configuração PWA
├── sw.js              ← Service Worker
├── server.js          ← Servidor Node.js
├── test-pwa.html      ← Teste de PWA
├── debug-firebase.html ← Debug Firebase
├── .htaccess          ← Config Apache
└── README.md          ← Este ficheiro
```

---

## ✨ Características

- 📷 Captura de fotos com câmara
- 💾 Armazenamento offline
- 🔄 Sincronização Firebase
- 📊 Upload para Google Sheets
- 📱 Instalável como app
- ⚡ Funciona offline

---

## 🔗 Links Úteis

- [PWA Manifesto](https://www.w3.org/TR/appmanifest/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Firebase Docs](https://firebase.google.com/docs)
- [Web App Install Banners](https://developer.chrome.com/en/docs/web-platform/app-install-banners/)

---

## 💡 Dicas

- Use `http://localhost:3000` para melhor compatibilidade
- Chrome DevTools: Abra "Application" > "Service Workers" para debug
- Limpe cache em caso de problemas: Ctrl+Shift+Delete
- Em produção, use HTTPS obrigatoriamente!

---

**Última atualização:** 2026-02-03
