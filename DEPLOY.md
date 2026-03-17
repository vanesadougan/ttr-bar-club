# 🚀 Guía de deploy — TTR Bar Club

## Estructura del proyecto
```
ttr-bar-club/
├── public/
│   ├── index.html       ← toda la app
│   └── manifest.json    ← PWA
├── vercel.json          ← routing para Vercel
└── database.rules.json  ← reglas Firebase
```

---

## PASO 1 — Crear proyecto Firebase

1. Ir a https://console.firebase.google.com
2. Click en **"Agregar proyecto"**
3. Nombre: `ttr-bar-club` → Continuar → Crear proyecto
4. En el panel izquierdo: **Compilación → Realtime Database**
5. Click **"Crear base de datos"**
   - Elegir ubicación: `us-central1`
   - Modo: **"Iniciar en modo de prueba"** → Habilitar
6. Ir a **Configuración del proyecto** (ícono ⚙️ arriba a la izquierda)
7. Bajar a **"Tus apps"** → click `</>` (Web)
8. Nombre de la app: `ttr-bar-club` → Registrar app
9. Copiar el objeto `firebaseConfig` que aparece, ejemplo:
```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "ttr-bar-club.firebaseapp.com",
  databaseURL: "https://ttr-bar-club-default-rtdb.firebaseio.com",
  projectId: "ttr-bar-club",
  storageBucket: "ttr-bar-club.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## PASO 2 — Pegar la config en index.html

Abrir `public/index.html` y buscar la sección:
```js
// ─── FIREBASE CONFIG ───────────────────────────────
// Reemplazá estos valores con los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "REEMPLAZAR",
  ...
};
```

Reemplazar **todo el objeto** con el que copiaste en el paso anterior.

---

## PASO 3 — Subir a GitHub

```bash
# En tu terminal, dentro de la carpeta ttr-bar-club:
git init
git add .
git commit -m "TTR Bar Club - deploy inicial"

# Crear repo en github.com con nombre: ttr-bar-club
# Luego:
git remote add origin https://github.com/TU_USUARIO/ttr-bar-club.git
git branch -M main
git push -u origin main
```

---

## PASO 4 — Deploy en Vercel

1. Ir a https://vercel.com → Login con GitHub
2. Click **"Add New Project"**
3. Importar el repo `ttr-bar-club`
4. Configuración:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Output Directory**: `public`
5. Click **"Deploy"**
6. En 1 minuto la app estará en: `https://ttr-bar-club.vercel.app`

---

## PASO 5 — Generar QR por mesa

Una vez que la app esté online, para cada mesa el link es:
```
https://ttr-bar-club.vercel.app/mesa/ID_DE_MESA
```

El ID de la mesa se genera automáticamente en Firebase cuando la creás desde el admin. Para verlo:
1. Abrí la app en `/admin`
2. Creá las mesas
3. Cada mesa muestra el botón **"🔗 Copiar link QR"**
4. Pegá ese link en https://qr.io o https://www.qrcode-monkey.com para generar el QR imprimible

---

## PASO 6 — Acceso admin desde notebook

Simplemente abrí:
```
https://ttr-bar-club.vercel.app
```
La app abre por defecto en modo Administrador.

---

## PASO 7 — Reglas de seguridad Firebase (opcional, para producción)

Para mayor seguridad, ir a Firebase → Realtime Database → Reglas y pegar:
```json
{
  "rules": {
    ".read": true,
    "orders": { ".write": true },
    "dishes":  { ".write": "auth != null" },
    "tables":  { ".write": "auth != null" },
    "ratings": { ".write": true }
  }
}
```
> Esto permite que solo usuarios autenticados modifiquen el menú y las mesas.
> Los pedidos y calificaciones los puede escribir cualquiera (los comensales).

---

## Resumen de URLs

| Uso | URL |
|-----|-----|
| Admin (notebook) | `https://ttr-bar-club.vercel.app` |
| Comensal Mesa 1 | `https://ttr-bar-club.vercel.app/mesa/ID` |
| QR por mesa | Generado desde el panel admin |

---

## ¿Necesitás ayuda?

Cualquier duda con los pasos, compartí el error y lo resolvemos.
