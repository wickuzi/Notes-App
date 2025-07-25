# Guía de Deployment - Full Stack App (Gratis)

## 🚀 Stack de Despliegue
- **Backend (Django)**: Render.com
- **Frontend (React)**: Vercel
- **Base de datos**: PostgreSQL (incluida en Render)

## 🔧 Pasos para el Backend (Render)

1. **Crear cuenta en Render**
   - Ve a [render.com](https://render.com)
   - Regístrate con GitHub

2. **Crear un nuevo Web Service**
   - Haz clic en "New" y selecciona "Web Service"
   - Conecta tu repositorio de GitHub
   - Selecciona la carpeta `backend`

3. **Configuración del Backend**
   - **Name**: Un nombre para tu servicio (ej: `mi-app-backend`)
   - **Region**: Elige la más cercana
   - **Branch**: `main` o `master`
   - **Build Command**: `chmod a+x build.sh && ./build.sh`
   - **Start Command**: `chmod a+x start.sh && ./start.sh`

4. **Variables de Entorno**
   Agrega estas variables en Render:
   ```
   PYTHON_VERSION = 3.10.8
   DJANGO_SETTINGS_MODULE = backend.settings_prod
   SECRET_KEY = tu-clave-secreta-segura
   DEBUG = False
   ```

5. **Base de Datos**
   - En el dashboard de Render, haz clic en "New" y selecciona "PostgreSQL"
   - Configura la base de datos
   - Copia la URL de conexión externa
   - Agrega esta variable a tu Web Service:
     ```
     DATABASE_URL = url-de-tu-base-de-datos
     ```

## 🎨 Pasos para el Frontend (Vercel)

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub

2. **Importar Proyecto**
   - Haz clic en "New Project"
   - Importa tu repositorio
   - Selecciona la carpeta `frontend`

3. **Configuración del Frontend**
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Install Command**: `npm install`

4. **Variables de Entorno**
   Agrega esta variable:
   ```
   VITE_API_URL = https://tu-backend-en-render.onrender.com
   ```
   (Reemplaza con la URL de tu backend en Render)

5. **Despliegue**
   - Haz clic en "Deploy"
   - Vercel desplegará tu aplicación automáticamente

## 🔄 Actualizar CORS en el Backend

1. Después de desplegar el frontend, copia su URL de Vercel
2. En Render, ve a tu Web Service
3. Edita las variables de entorno y actualiza:
   ```
   CORS_ALLOWED_ORIGINS = ["https://tu-frontend.vercel.app"]
   ```
4. Reinicia el servicio

## 🔍 Probar la Aplicación
- Verifica que el backend responda en: `https://tu-backend-en-render.onrender.com/admin`
- Verifica que el frontend se muestre correctamente
- Prueba las funcionalidades que requieran comunicación con el backend

## 📝 Notas Importantes
- Render puede tardar unos minutos en desplegar los cambios
- El plan gratuito de Render pone a dormir tu backend después de 15 minutos de inactividad
- Vercel ofrece despliegues instantáneos con cada push a tu repositorio

## 🛠 Solución de Problemas
- **Error 503**: Verifica que el comando de inicio esté correcto
- **Errores de CORS**: Asegúrate de que las URLs en `CORS_ALLOWED_ORIGINS` sean correctas
- **Errores de base de datos**: Verifica que la URL de la base de datos sea correcta
