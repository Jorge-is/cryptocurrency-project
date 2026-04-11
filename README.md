# CriptoMarket

Un portal web moderno y profesional para visualizar, analizar y guardar el progreso del mercado de criptomonedas en tiempo real. Desarrollado como un proyecto escalable de nivel Senior utilizando **React, Vite y Supabase**.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)

## 🌟 Características Principales

- **Arquitectura Escalable:** Estructura basada en *Features* (Módulos independientes para Auth, Crypto, y Perfil).
- **Autenticación Segura (Auth):** Registro e inicio de sesión real implementado con Supabase. Rutas protegidas para el contenido privado.
- **Datos en Tiempo Real:** Consumo de la API oficial de referenciación de [CoinCap](https://docs.coincap.io/) para proveer los valores del mercado.
- **Watchlist y Portafolio:** Permite a los usuarios marcar criptomonedas como favoritas y visualizar su propia "Watchlist" que las lee desde la base de datos remotamente en cada inicio de sesión.
- **Buscador Inteligente:** Filtros integrados para buscar criptomonedas por Rank, Ganancias, Pérdidas o Precio.
- **UI / UX:** Diseño *Glassmorphism* moderno, Dark Theme responsivo (Mobile-First) y componentes modulares altamente reutilizables y limpios usando *Vanilla CSS Variables* e íconos de `lucide-react`.

## 📂 Arquitectura de Carpetas

```text
src/
├── components/          # Componentes Globales Compartidos
│   └── layout/          # Layout principal (Navbar, enrutamiento, wrappers)
├── context/             # Manejadores de Estado Global (UserContext / Session)
├── features/            # Dominio lógico del negocio (Feature-based)
│   ├── auth/            # Vistas y lógica de Login / Registro
│   ├── crypto/          # Lógica, Vistas (Grillas, Detalles) y Componentes UI del Mercado
│   └── profile/         # Vistas del portafolio personal y hooks de BD (Hook useFavorites)
├── hooks/               # Custom Hooks globales (Manejo de asincronía y peticiones)
├── pages/               # Vistas Públicas generales (Home Landing)
├── services/            # Inicialización de clientes externos (Supabase Auth/DB)
└── utils/               # Funciones de apoyo (Formateo numérico en dólares, porcentajes)
```

## 🚀 Instalación y Configuración (Local)

1. **Clonar e instalar dependencias:**
   ```bash
   git clone [URL-DEL-PROYECTO]
   cd cryptocurrency-project
   yarn install
   ```

2. **Configuración de Variables de Entorno (.env.local):**
   Crea un archivo llamado `.env.local` en la raíz del proyecto y añade tus credenciales.
   ```env
   VITE_API_URL="https://api.coincap.io/v2/"
   VITE_API_KEY="TU_API_KEY_DE_COINCAP_OPCIONAL"
   VITE_SUPABASE_URL="TU_URL_DE_SUPABASE"
   VITE_SUPABASE_ANON_KEY="TU_ANON_KEY_DE_SUPABASE"
   ```

3. **Configurar Base de Datos de Supabase (SQL Editor):**
   Para que el portafolio guarde exitosamente, debes correr este script en tu dashboard de Supabase:
   ```sql
   CREATE TABLE favorites (
     id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_id uuid REFERENCES auth.users NOT NULL,
     crypto_id text NOT NULL,
     created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
     UNIQUE(user_id, crypto_id)
   );
   ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Users can manage their own favorites" ON favorites
     FOR ALL USING (auth.uid() = user_id);
   ```

4. **Levantar el Servicio de Desarrollo:**
   ```bash
   yarn dev
   yarn dev --host
   ```
