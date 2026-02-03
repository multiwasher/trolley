@echo off
REM Script para iniciar TrolleyCheck PWA no Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║   🚀 TrolleyCheck PWA - Iniciador     ║
echo ╚════════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ✅ Node.js detectado
    echo.
    echo Iniciando servidor...
    echo.
    node server.js
    goto :EOF
)

REM Verificar Python
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ⚠️ Node.js não encontrado, usando Python
    echo.
    echo Iniciando servidor...
    echo.
    echo 📱 Aceda a http://localhost:3000
    echo.
    python -m http.server 3000
    goto :EOF
)

REM Verificar PHP
where php >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo ⚠️ Node.js não encontrado, usando PHP
    echo.
    echo Iniciando servidor...
    echo.
    echo 📱 Aceda a http://localhost:3000
    echo.
    php -S localhost:3000
    goto :EOF
)

echo ❌ Nenhum servidor disponível!
echo.
echo Por favor, instale um dos seguintes:
echo   • Node.js: https://nodejs.org
echo   • Python: https://www.python.org
echo   • PHP: https://www.php.net
echo.
pause
