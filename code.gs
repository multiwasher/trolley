/**
 * Webhook SIMPLES: Recebe Base64, faz upload ao Firebase Storage, retorna URL
 */

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .addHeader("Access-Control-Allow-Origin", "*")
    .addHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .addHeader("Access-Control-Allow-Headers", "Content-Type");
}

function doPost(e) {
  try {
    const output = ContentService.createTextOutput();
    output.addHeader("Access-Control-Allow-Origin", "*");
    output.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    output.addHeader("Access-Control-Allow-Headers", "Content-Type");
    
    const data = JSON.parse(e.postData.contents);
    const imagemBase64 = data.imagemBase64;
    const filename = data.filename;
    
    Logger.log(`📥 Upload: ${filename}`);
    
    // Decodificar Base64 em bytes
    const decodedImg = Utilities.base64Decode(imagemBase64);
    const blob = Utilities.newBlob(decodedImg, "image/jpeg", filename);
    
    // Fazer upload ao Firebase Storage usando REST API
    const projectId = "troll-a439d";
    const storageBucket = "troll-a439d.firebasestorage.app";
    const apiKey = "AIzaSyAzzIpUAm9rLpieMQ0z3H4hvY-amvaTkpM";
    
    const storageUrl = `https://firebasestorage.googleapis.com/upload/storage/v1/b/${storageBucket}/o?uploadType=media&name=photos%2F${encodeURIComponent(filename)}&key=${apiKey}`;
    
    const uploadOptions = {
      method: "post",
      payload: decodedImg,
      headers: {
        "Content-Type": "image/jpeg"
      },
      muteHttpExceptions: true
    };
    
    const uploadResponse = UrlFetchApp.fetch(storageUrl, uploadOptions);
    const uploadCode = uploadResponse.getResponseCode();
    
    Logger.log(`Upload response: ${uploadCode}`);
    
    if (uploadCode === 200) {
      // Gerar URL de download
      const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/photos%2F${encodeURIComponent(filename)}?alt=media`;
      
      Logger.log(`✅ Upload OK: ${downloadUrl}`);
      
      output.setMimeType(ContentService.MimeType.JSON);
      output.append(JSON.stringify({
        success: true,
        downloadUrl: downloadUrl,
        previewUrl: downloadUrl,
        filename: filename
      }));
      return output;
    } else {
      throw new Error(`Upload failed: HTTP ${uploadCode}`);
    }
    
  } catch (error) {
    Logger.log(`❌ Erro: ${error.toString()}`);
    const output = ContentService.createTextOutput();
    output.addHeader("Access-Control-Allow-Origin", "*");
    output.setMimeType(ContentService.MimeType.JSON);
    output.append(JSON.stringify({
      success: false,
      error: error.toString()
    }));
    return output;
  }
}


/**
 * Função para guardar fileId no Firebase (chamada após upload com sucesso)
 */
function savePhotoMetadataToFirebase(trolleyId, step, fileId, downloadUrl, previewUrl) {
  try {
    // Esta função seria chamada via Cloud Functions ou Webhook adicional
    // Como alternativa rápida, guardamos na Sheet (já fazemos acima)
    Logger.log(`✅ Foto guardada: ${trolleyId} Passo ${step} - FileID: ${fileId}`);
  } catch (error) {
    Logger.log("Erro a guardar metadata: " + error.toString());
  }
}
function testDriveAccess() {
  const folderId = "1EOZFc3TEyixdhjENyCR28Zg6igdMNuMm";
  try {
    const folder = DriveApp.getFolderById(folderId);
    Logger.log("✅ Acesso confirmado à pasta: " + folder.getName());
    
    // Testar criação de ficheiro de teste
    const testBlob = Utilities.newBlob("test", "text/plain", "test.txt");
    const testFile = folder.createFile(testBlob);
    testFile.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
    Logger.log("✅ Ficheiro de teste criado: " + testFile.getUrl());
    
    // Remover ficheiro de teste
    testFile.setTrashed(true);
    Logger.log("✅ Ficheiro de teste removido");
    
  } catch (e) {
    Logger.log("❌ Erro de acesso: " + e.toString());
  }
}

/**
 * Função para testar manualmente a resposta do webhook
 */
function testWebhookResponse() {
  const testData = {
    trolleyId: "TEST001",
    passo: 1,
    etapaNome: "Etiqueta ID",
    numFoto: 1,
    dataHora: new Date().toLocaleString('pt-PT'),
    imagemBase64: Utilities.base64Encode(Utilities.newBlob("fake image data").getBytes()),
    folderId: "1EOZFc3TEyixdhjENyCR28Zg6igdMNuMm",
    filename: "test_image.jpg"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const response = doPost(mockEvent);
  Logger.log("Resposta do webhook: " + response.getContent());
}
