# TrolleyCheck - PWA

Aplicação Web Progressiva (PWA) para controlo de qualidade e registo profissional de trolleys.

## ✨ Características PWA

- ✅ **Installável** - Botão expansível no topo para instalar a app
- 📱 **Offline First** - Funciona offline com Service Worker
- 💾 **Armazenamento Local** - Dados guardados no dispositivo
- ⚡ **Performance** - Carregamento rápido e fluído
- 🎨 **Design Responsivo** - Adapta-se a qualquer dispositivo

## 🚀 Como Instalar

### No Desktop (Chrome, Edge, Firefox):
1. Clique no botão **⬇️** no canto superior direito
2. Selecione "Instalar no Dispositivo"
3. A app será adicionada ao seu menu de aplicações

### No Mobile (Android):
1. Abra a app no Chrome/Firefox
2. Toque no botão **⬇️** no canto superior direito
3. Selecione "Instalar no Dispositivo"
4. A app aparecerá no seu ecrã inicial

### No iOS (Safari):
1. Abra em Safari
2. Toque no ícone Partilhar
3. Selecione "Adicionar ao Ecrã Principal"

## 📋 Ficheiros da PWA

- `manifest.json` - Configuração da aplicação PWA
- `sw.js` - Service Worker para modo offline
- `index.html` - Aplicação principal com suporte PWA

## 🎯 Funcionalidades

- Registo de trolleys com fotos em 4 passos
- Câmara integrada para captura de imagens
- Arquivo local de todos os registos
- Sincronização com Firebase
- Upload automático para Google Drive

## 🔧 Desenvolvimento

Para testar localmente:
```bash
# Servir com um servidor local (ex: Python)
python -m http.server 8000

# Aceder a http://localhost:8000
```

**Nota:** O Service Worker funciona apenas em HTTPS ou localhost

## 📦 Compatibilidade

- Chrome 39+
- Firefox 44+
- Edge 15+
- Safari 11.1+ (iOS)
- Samsung Internet 5+