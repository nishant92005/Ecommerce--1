# MongoDB Setup Guide - Windows

## Step 1: MongoDB Install Karein

### Option A: MongoDB Community Server Install Karein

1. **Download MongoDB:**
   - https://www.mongodb.com/try/download/community
   - Windows x64 version download karein
   - MSI installer download karein

2. **Install MongoDB:**
   - Downloaded file run karein
   - "Complete" installation choose karein
   - "Install MongoDB as a Service" option select karein
   - Default settings ke saath install karein
   - "Install MongoDB Compass" (GUI tool) bhi install kar sakte hain (optional)

3. **Verify Installation:**
   - Command Prompt ya PowerShell open karein
   - Run karein:
   ```bash
   mongod --version
   ```

### Option B: MongoDB Atlas (Cloud - Free) - Easier Option

Agar local install karna mushkil ho, to cloud MongoDB use kar sakte hain:

1. **MongoDB Atlas Account Banao:**
   - https://www.mongodb.com/cloud/atlas/register
   - Free account banao

2. **Cluster Create Karein:**
   - "Build a Database" click karein
   - Free tier (M0) select karein
   - Region choose karein (closest to you)
   - Cluster name dein

3. **Database User Banao:**
   - "Database Access" section mein jao
   - "Add New Database User" click karein
   - Username aur password set karein
   - "Read and write to any database" permission dein

4. **Network Access Allow Karein:**
   - "Network Access" section mein jao
   - "Add IP Address" click karein
   - "Allow Access from Anywhere" (0.0.0.0/0) select karein (development ke liye)

5. **Connection String Lein:**
   - "Connect" button click karein
   - "Connect your application" choose karein
   - Connection string copy karein
   - Username aur password replace karein

6. **Backend Config Update Karein:**
   - `backend/db/config.js` file mein connection string update karein

---

## Step 2: MongoDB Service Start Karein (Local Installation)

### Windows Service Check:

1. **Services Check Karein:**
   - Windows Key + R press karein
   - `services.msc` type karein aur Enter press karein
   - "MongoDB" service dhundhein
   - Agar running nahi hai, to right-click karke "Start" karein

2. **Command Se Start Karein:**
   ```powershell
   # PowerShell (Admin) mein run karein
   net start MongoDB
   ```

3. **Manual Start (Agar Service Nahi Hai):**
   ```powershell
   # MongoDB bin folder mein jao (usually C:\Program Files\MongoDB\Server\7.0\bin)
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   mongod
   ```

---

## Step 3: Connection Verify Karein

### Test 1: MongoDB Shell Se

```powershell
# MongoDB shell open karein
mongosh

# Agar connection ho gaya, to ye dikhega:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://
```

### Test 2: Node.js Se (Our Project)

```powershell
cd backend
node -e "import('./db/config.js').then(() => console.log('Connected!'))"
```

---

## Step 4: Database Seed Karein

Jab MongoDB running ho, to products seed karein:

```powershell
cd backend
npm run seed
```

Success message aayega:
```
✅ MongoDB connected
🗑️  Cleared existing products
✅ Seeded 30 products successfully
```

---

## Step 5: Backend Server Start Karein

```powershell
cd backend
npm start
```

Agar MongoDB connected hai, to ye dikhega:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:1709
```

---

## Troubleshooting

### Problem 1: "MongoDB not connected" Error

**Solution:**
- MongoDB service check karein: `services.msc`
- Service start karein: `net start MongoDB`
- Port 27017 check karein: `netstat -ano | findstr 27017`

### Problem 2: "Access Denied" Error

**Solution:**
- PowerShell ya Command Prompt ko "Run as Administrator" se open karein
- Phir MongoDB start karein

### Problem 3: MongoDB Install Nahi Ho Raha

**Solution:**
- MongoDB Atlas (cloud) use karein - ye easier hai
- Ya MongoDB portable version download karein

### Problem 4: Port Already in Use

**Solution:**
- Task Manager mein MongoDB process check karein
- Ya different port use karein (config.js mein change karein)

---

## Quick Start Commands

```powershell
# 1. MongoDB Start (Agar service installed hai)
net start MongoDB

# 2. Backend folder mein jao
cd backend

# 3. Database seed karein
npm run seed

# 4. Server start karein
npm start

# 5. New terminal mein frontend start karein
cd frontend
npm run dev
```

---

## MongoDB Atlas Use Karne Ke Liye

Agar MongoDB Atlas use kar rahe hain, to `backend/db/config.js` update karein:

```javascript
import mongoose from "mongoose";

// Atlas connection string (apna connection string yahan paste karein)
const connectionString = "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/e-commerce?retryWrites=true&w=majority";

mongoose.connect(connectionString)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("⚠️  Server will continue running, but database operations will fail.");
  });
```

**Note:** `username`, `password`, aur `cluster0.xxxxx` ko apne actual values se replace karein.

---

## Success Indicators

✅ MongoDB connected successfully  
✅ Seeded 30 products successfully  
🚀 Server running on http://localhost:1709

Agar ye messages dikh rahe hain, to sab theek hai! 🎉


