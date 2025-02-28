# Chat App

A real-time chat application built with Next.js, Socket.IO, Tailwind CSS v4, and shadcn UI components.

## 🚀 Features
- 🔥 **Real-Time Chat:** Instant messaging using Socket.IO
- 🎨 **Modern UI:** Built with shadcn and Tailwind CSS v4
- 🛠️ **Custom Server:** Fully customized server setup for flexibility
- 🎭 **Animations:** Smooth transitions with Framer Motion
- 📅 **Date Formatting:** Easy date handling with date-fns

## 🛠️ Tech Stack
**Frontend:** Next.js 15, React 19, shadcn UI, Tailwind CSS v4  
**Backend:** Node.js, Socket.IO (Custom Server)  
**Styling:** Tailwind CSS, shadcn components, Lucide Icons  
**Utilities:** date-fns, class-variance-authority, Framer Motion  

## 📦 Installation

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the development server:
```bash
npm run dev
```

### 4. Start the custom Socket.IO server:
```bash
npm run dev:socket
```

The app will be running at http://localhost:3000.

## 📄 Scripts
- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the Next.js app for production
- `npm run start` - Start the Next.js app in production
- `npm run lint` - Lint the codebase
- `npm run dev:socket` - Start the custom Socket.IO server in development
- `npm run build:socket` - Build the custom server for production
- `npm run start:socket` - Start the custom server in production

## ✨ Styling & UI
This project leverages shadcn and Tailwind CSS v4 for a modern and clean design. Ensure Tailwind is configured properly in tailwind.config.js.

## ⚡ Custom Server with Socket.IO
The chat app uses a custom server with Socket.IO for real-time communication.

Run in development:
```bash
npm run dev:socket
```

Run in production:
```bash
npm run build:socket
npm run start:socket
```

## 🧑‍💻 Development
Ensure TypeScript and ESLint are properly set up:
```bash
npm run lint
```

## 📂 Project Structure
```
├── app                     # Next.js app
├── components              # Reusable UI components (shadcn)
├── hooks                   # Custom hooks
├── lib                     # Utility functions
├── pages                   # Next.js pages
├── public                  # Static assets
├── server.mts              # Custom Socket.IO server (development)
├── start-dev.bat           # Start the custom server in development
├── start-server.bat        # Start the custom server in production
├── start.bat               # Start the Next.js app in production
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config for frontend
└── tsconfig.server.json    # TypeScript config for server
```


## 📋 License
This project is licensed under the MIT License.

Made with ❤️ by Hassan Zohaib.