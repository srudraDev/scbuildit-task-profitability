import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "SimCity BuildIt Profitability Calculator",
        short_name: "SimCity ProfitCalc",
        description: "Calculate shipment profitability in SimCity BuildIt.",
        start_url: "/",
        display: "standalone",
        background_color: "#3b82f6",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/assets/icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/assets/icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
