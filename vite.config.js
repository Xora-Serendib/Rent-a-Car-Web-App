import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function localSyncPlugin() {
  const syncLocations = [
    'E:/Projects/danusha-shared_sync_data/sync.json',
    'C:/Users/MSI/.gemini/antigravity/scratch/shared_sync_data/sync.json'
  ];

  const getSyncFile = () => {
    for (const p of syncLocations) {
      if (fs.existsSync(p)) return p;
    }
    return syncLocations[0];
  };

  return {
    name: 'local-sync-plugin',
    configureServer(server) {
      server.middlewares.use('/api/local-sync', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        }

        const syncFile = getSyncFile();

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            try {
              const incoming = JSON.parse(body);
              let current = { bookings: [], fleet: [] };
              if (fs.existsSync(syncFile)) {
                try {
                  current = JSON.parse(fs.readFileSync(syncFile, 'utf-8'));
                } catch {}
              }
              if (!Array.isArray(current.bookings)) current.bookings = [];

              if (incoming.booking) {
                const idx = current.bookings.findIndex((b) => b.id === incoming.booking.id);
                if (idx >= 0) {
                  current.bookings[idx] = incoming.booking;
                } else {
                  current.bookings = [incoming.booking, ...current.bookings];
                }
              }
              if (Array.isArray(incoming.bookings)) {
                current.bookings = incoming.bookings;
              }
              if (Array.isArray(incoming.fleet)) {
                current.fleet = incoming.fleet;
              }

              // Write to all sync locations
              syncLocations.forEach((loc) => {
                try {
                  const dir = path.dirname(loc);
                  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                  fs.writeFileSync(loc, JSON.stringify(current, null, 2));
                } catch {}
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: current.bookings.length }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else if (req.method === 'GET') {
          try {
            if (fs.existsSync(syncFile)) {
              const data = fs.readFileSync(syncFile, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              return res.end(data);
            }
          } catch {}
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ bookings: [], fleet: [] }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localSyncPlugin()],
  server: {
    host: true,
    port: 3000,
    open: false
  }
});
