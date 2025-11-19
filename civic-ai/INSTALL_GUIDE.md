# CivicAI - Quick Setup Instructions

## For Windows Users

### Method 1: Double-click the install file
1. Locate `install.bat` in the project folder
2. **Double-click** `install.bat`
3. The script will automatically:
   - Check if Node.js and npm are installed
   - Clean any previous installations
   - Install all required packages
   - Start the development server

### Method 2: Run from Command Prompt/PowerShell
```bash
cd "Z:\Hacknovate Project\civic-ai"
install.bat
```

---

## For Mac/Linux Users

### Make the script executable (first time only):
```bash
chmod +x install.sh
```

### Run the installation:
```bash
./install.sh
```

Or using bash:
```bash
bash install.sh
```

---

## What the Installation Script Does

1. ✅ Checks if Node.js and npm are installed
2. ✅ Removes old installations (node_modules, cache)
3. ✅ Installs all dependencies from package.json
4. ✅ Verifies installation was successful
5. ✅ Automatically starts the development server

---

## Manual Installation (Alternative)

If you prefer to install manually:

```bash
# Navigate to project directory
cd "Z:\Hacknovate Project\civic-ai"

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Prerequisites

Before running the installation script, make sure you have:

- **Node.js** v20 or higher installed
  - Download from: https://nodejs.org/
- **npm** v10 or higher (comes with Node.js)

To check if installed:
```bash
node --version
npm --version
```

---

## After Installation

Once installation is complete, the development server will automatically start at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

---

## Troubleshooting

### "Node.js is not installed" error
- Install Node.js from https://nodejs.org/
- Restart your terminal/command prompt after installation

### "Installation failed" error
- Check your internet connection
- Try running the script again
- If still failing, use manual installation method

### Port 3000 already in use
```bash
# Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID [process_id] /F

# Or use a different port
set PORT=3001 && npm run dev
```

---

## Files Included

- **install.bat** - Windows installation script
- **install.sh** - Mac/Linux installation script
- **package.json** - Dependencies list with versions
- **package-lock.json** - Exact version locks

---

**Share these files** with your team members and they can set up the project by simply running the installation script!
