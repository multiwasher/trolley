# 🐛 Debug PWA - TrolleyCheck

## Requisitos para PWA funcionar

### ✅ Obrigatório:
1. **HTTPS** - A aplicação deve estar servida por HTTPS (em desenvolvimento, localhost funciona)
2. **Manifest.json** - ✅ Presente em `/manifest.json`
3. **Service Worker** - ✅ Presente em `/sw.js` e registado em `index.html`
4. **Icons** - ✅ Definidos no manifest.json

### Checklist:

- ✅ Manifest linked no `<head>`
- ✅ Service Worker registado no `<head>`
- ✅ Meta tags:
  - `theme-color`
  - `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-status-bar-style`
- ✅ `display: "standalone"` no manifest.json

## Como Testar

### 1. Verificar Console (F12)
```
✅ Service Worker registado: (...)
🔍 Procurando eventos de instalação PWA...
📱 Service Workers registados: 1
```

Se vir erros, temos um problema!

### 2. Chrome DevTools
1. Abrir `F12` → **Application** (ou **Resources**)
2. Procurar **Service Workers**
   - Deve estar com status "activated"
3. Procurar **Manifest**
   - Deve estar OK

### 3. Requisitos do Browser

**Chrome/Chromium:**
- Versão 31+
- HTTPS (ou localhost)

**Firefox:**
- Versão 55+
- HTTPS (ou localhost)

**Safari (iOS):**
- iOS 15.1+
- Adicionar manualmente à home screen (sem botão automático)

**Edge:**
- Versão 79+
- Mesmo que Chrome

## Possíveis Problemas

### ❌ Botão não aparece
1. **Service Worker não está registado**
   - Verifique a consola (F12)
   - Recarregue a página (Ctrl+Shift+R para hard refresh)

2. **Manifest inválido**
   - Abra `/manifest.json` diretamente
   - Use https://manifest-validator.appspot.com/

3. **Não é HTTPS**
   - PWA requer HTTPS (exceto localhost)
   - Verifique a URL do browser

4. **Browser não suporta**
   - Use Chrome, Firefox, Edge, Safari 15.1+

### ✅ Service Worker em cache
Se fez mudanças no SW e não vê efeito:
1. Abra DevTools → Application → Service Workers
2. Clique em **Unregister**
3. Feche a aba completamente
4. Reabra a página

## Logs de Debug

Abra a Consola (F12) e veja os logs com:
- 🔍 Procurando eventos
- ✅ Confirmações
- ❌ Erros

## Simulação de Instalação

No Chrome DevTools:
1. **F12** → **Application** → **Manifest**
2. Clique em **"Install"** (botão no topo)

Isto simula o que o browser faria automaticamente.

## Versão do Cache

Se mudar o `CACHE_NAME` em `sw.js`, o browser vai atualizar automaticamente.
Atualmente: `trolleycheck-v7`

---

**Última atualização:** 2026-02-03
