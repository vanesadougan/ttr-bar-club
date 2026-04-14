const fs = require('fs');

// Leer variables de entorno de Vercel
const config = {
  apiKey:            process.env.FIREBASE_API_KEY,
  authDomain:        process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL:       process.env.FIREBASE_DATABASE_URL,
  projectId:         process.env.FIREBASE_PROJECT_ID,
  storageBucket:     process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.FIREBASE_APP_ID,
};

// Validar que todas las variables estén definidas
const missing = Object.entries(config).filter(([,v]) => !v).map(([k]) => k);
if (missing.length > 0) {
  console.error('❌ Faltan variables de entorno:', missing.join(', '));
  process.exit(1);
}

// Leer index.html y reemplazar el placeholder
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('__FIREBASE_CONFIG__', JSON.stringify(config, null, 2));

// Escribir en la carpeta de output (dist/)
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);

console.log('✅ Build OK —', process.env.VERCEL_ENV || 'local');
