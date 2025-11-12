# 🪙 GoldenCity Web3 Wallet Connector

**GoldenCity** is a modern **real estate investment platform** that merges traditional property investing with cryptocurrency payments.
This project implements a **MetaMask wallet integration module** with seamless UX, elegant theming, and responsive design — built as part of a technical evaluation for the GoldenCity Web3 platform.

---

## 🌍 Overview

This module provides a secure and interactive way for users to:

* Connect their **MetaMask wallet**
* Display wallet address, network, and ETH balance
* Handle **account and chain changes** in real time
* Toggle between **Light/Dark modes** with smooth transitions
* Experience a **modern, animated, mobile-first** interface

It’s designed with both technical robustness and user delight in mind — simple enough to integrate, yet refined enough for production.

---

## 🧠 Key Features

✅ **Auto Theme Detection** — syncs with system preferences (Light/Dark)
✅ **MetaMask Detection** — notifies users if the extension isn’t installed
✅ **Wallet Connection** — secure connection flow with visual feedback
✅ **Account + Network Events** — real-time updates on wallet and network
✅ **Balance Display** — retrieves ETH balance via RPC
✅ **Persistent State** — restores connection across sessions
✅ **Responsive UI** — adaptive layout for mobile, tablet, and desktop
✅ **Animated Theme Switcher** — iOS-style toggle with fluid transitions
✅ **Built-in Notifications** — user feedback with `react-hot-toast`

---

## 🧬 Tech Stack

| Layer             | Technology                        |
| ----------------- | --------------------------------- |
| Frontend          | React 18, Vite                    |
| Styling           | Tailwind CSS                      |
| Icons             | Heroicons                         |
| Notifications     | react-hot-toast                   |
| Blockchain API    | MetaMask / Ethereum Provider      |
| State Persistence | Custom Hook (`usePersistedState`) |

---

## ⚙️ Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/arsenlblack/goldencity-web3-wallet.git

# 2. Enter the directory
cd goldencity-web3-wallet

# 3. Install dependencies
npm install

# 4. Run locally
npm run dev
```

Open in browser: **[http://localhost:5173](http://localhost:5173)**

---

## 💡 Demo Highlights

🎥 **Demo video (available upon request)**
The demo shows:

* Wallet connection and balance retrieval
* Live response to network/account change
* Smooth theme transitions
* Mobile and desktop layouts

---

## 🧱 Architecture Notes

The design emphasizes:

* **Atomic React components**
* **State persistence** with localStorage sync
* **One-directional data flow** with clear separation of logic and view
* **Ease of embedding** into larger React or Next.js applications

This ensures that the component can be integrated into production-grade environments with minimal refactoring.

---

## 👨‍💻 Author

**Arsen Nimchuk**
Full-Stack Architect / Web3 Developer
🔗 [LinkedIn](https://www.linkedin.com/in/arsen-nimchuk-603962a9)
💼 [GitHub](https://github.com/arsenlblack)

---

## 🏁 License

This project is provided for technical demonstration purposes.
All rights reserved © 2025 Arsen Nimchuk.
