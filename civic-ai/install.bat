@echo off
echo ================================================
echo CivicAI - Automated Setup Script
echo ================================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)

echo npm version:
npm --version
echo.

echo ================================================
echo Step 1: Cleaning previous installations...
echo ================================================
if exist node_modules (
    echo Removing old node_modules folder...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing old package-lock.json...
    del /f package-lock.json
)
if exist .next (
    echo Removing Next.js cache...
    rmdir /s /q .next
)
echo Cleanup complete!
echo.

echo ================================================
echo Step 2: Installing all dependencies...
echo ================================================
echo This may take a few minutes...
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ================================================
echo Step 3: Verifying installation...
echo ================================================

if not exist node_modules (
    echo ERROR: node_modules folder not created!
    pause
    exit /b 1
)

echo All packages installed successfully!
echo.

echo ================================================
echo Installation Complete!
echo ================================================
echo.
echo You can now run the following commands:
echo   - npm run dev     (Start development server)
echo   - npm run build   (Build for production)
echo   - npm start       (Start production server)
echo.
echo Press any key to start the development server...
pause >nul

echo.
echo Starting development server...
echo.
call npm run dev
