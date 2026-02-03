# Configuração do Firestore - TrolleyCheck

## Problema Atual
```
FirebaseError: Missing or insufficient permissions.
```

As regras de segurança do Firestore estão a bloquear o acesso aos documentos.

## Solução

### 1. Adicionar Domínio ao Firebase Console

1. Aceda ao [Firebase Console](https://console.firebase.google.com/)
2. Seleccione o projeto `troll-a439d`
3. Vá para **Authentication** → **Settings** → **Authorized domains**
4. Clique em **Add domain**
5. Adicione:
   - `effective-fortnight-pj46qr7wg76j3r5pp-3000.app.github.dev`
   - Qualquer outro domínio que use a aplicação

### 2. Configurar as Regras de Firestore

1. No Firebase Console, vá para **Firestore Database** → **Rules**
2. Substitua o conteúdo pelas regras abaixo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública da coleção 'photos'
    match /photos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Permitir leitura pública do caminho antigo 'artifacts'
    match /artifacts/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Clique em **Publish**

## Explicação das Regras

- **allow read: if true** → Qualquer pessoa pode ler os dados (público)
- **allow write: if request.auth != null** → Apenas utilizadores autenticados podem escrever

## Alternativa (Mais Seguro)

Se preferir permitir apenas leitura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /artifacts/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Validação

Após fazer as alterações:
1. Recarregue a aplicação (F5 ou Cmd+R)
2. Clique na aba **Firebase**
3. Os documentos deverão aparecer

## Suporte

Se ainda tiver erros:
- Consulte a consola do navegador (F12 → Console)
- Verifique se o `projectId` está correto: `troll-a439d`
- Aguarde 5 minutos após publicar as regras (propagação)
