# Regras do Firestore - TrolleyCheck

## ❌ Problema Atual
```
FirebaseError: Missing or insufficient permissions.
```

Apesar das regras parecerem corretas, pode haver problemas:

## ✅ Solução 1: Regras Mais Permissivas (Para Testes)

Se está a testar, use estas regras **temporariamente**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir tudo por enquanto (apenas para testes)
    allow read, write, delete: if true;
  }
}
```

**⚠️ IMPORTANTE:** Isto é perigoso em produção! Use apenas para debug.

## ✅ Solução 2: Regras Seguras (Recomendado)

Para produção com autenticação anónima:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Coleção raiz de fotos
    match /photos/{document=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
  }
}
```

**Se continuar com erro de permissões, tente adicionar também o caminho antigo:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Coleção raiz
    match /photos/{document=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Caminho antigo (se existir)
    match /artifacts/{document=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
  }
}
```

## 🔧 Passos para Verificar

1. **No Firebase Console:**
   - Firestore Database → Rules
   - Copie e cole uma das soluções acima
   - Clique em **Publish**
   - ⏳ Aguarde 30-60 segundos para propagação

2. **⚠️ IMPORTANTE - Limpar Cache:**
   - Feche **COMPLETAMENTE** o browser
   - Ou use **DevTools → Application → Clear site data**
   - Abra em **Incógnito/Privado** (sem cache)
   - Recarregue a página (Ctrl+Shift+R)

3. **Verificar Autenticação:**
   - Abra DevTools (F12) → Console
   - Procure por: `✅ Utilizador autenticado: <UID>`
   - Se não vir, a autenticação anónima falhou

## ✅ Solução 3: Adicionar Mais Coleções (Se Necessário)

Se tem documentos em coleções diferentes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Coleção raiz
    match /photos/{document=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
    
    // Coleção nested (se existir)
    match /artifacts/{document=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
  }
}
```

## 📋 Checklist

- [ ] Regras publicadas no Firebase Console
- [ ] 30 segundos passados desde publicação
- [ ] Browser recarregado (Ctrl+Shift+R)
- [ ] Console mostra `✅ Service Worker registado`
- [ ] Console mostra `✅ Utilizador autenticado`
- [ ] Nenhuma aba privada/incógnito aberta anteriormente

## 🆘 Se Continuar a Falhar

1. Tente com as regras completamente abertas (Solução 1)
2. Verifique se Firestore está **ativado** no projeto
3. Verifique se está no projeto correto: `troll-a439d`
4. Aguarde 1-2 minutos e recarregue

---

**Última atualização:** 2026-02-03
