#!/bin/bash

echo "================================================"
echo "CivicAI - Automated Setup Script"
echo "================================================"
echo ""

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version:"
node --version
echo ""

echo "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed!"
    exit 1
fi

echo "npm version:"
npm --version
echo ""

echo "================================================"
echo "Step 1: Cleaning previous installations..."
echo "================================================"
if [ -d "node_modules" ]; then
    echo "Removing old node_modules folder..."
    rm -rf node_modules
fi
if [ -f "package-lock.json" ]; then
    echo "Removing old package-lock.json..."
    rm -f package-lock.json
fi
if [ -d ".next" ]; then
    echo "Removing Next.js cache..."
    rm -rf .next
fi
echo "Cleanup complete!"
echo ""

echo "================================================"
echo "Step 2: Installing all dependencies..."
echo "================================================"
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Installation failed!"
    echo "Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "================================================"
echo "Step 3: Verifying installation..."
echo "================================================"

if [ ! -d "node_modules" ]; then
    echo "ERROR: node_modules folder not created!"
    exit 1
fi

echo "All packages installed successfully!"
echo ""

echo "================================================"
echo "Installation Complete!"
echo "================================================"
echo ""
echo "You can now run the following commands:"
echo "  - npm run dev     (Start development server)"
echo "  - npm run build   (Build for production)"
echo "  - npm start       (Start production server)"
echo ""
echo "Press Enter to start the development server..."
read

echo ""
echo "Starting development server..."
echo ""
npm run dev
