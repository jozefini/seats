# Nana App

### Setup

#### - WordPress (backend)

1. Enable REST-API Authorization and allow CORS origin (`.htaccess`)

```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

...

# Allow origin for frontend app.
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "https://frontend-url.com"
</IfModule>
```

2. Add JWT Secret Token and enable CORS (`wp-config.php`)

```
define('JWT_AUTH_SECRET_KEY', '...');
define('JWT_AUTH_CORS_ENABLE', true);
```

#### - React App (frontend)

1. Set environment variables in (server settings or `.env`)

```
VITE_APP_TITLE = NANA
VITE_BACKEND_URL = https://dev-nana.d3.rgbc.dev
VITE_REST_ENDPOINT = wp-json/rgbc/v1
```

2. Highlight Tailwind classes in `const css = {}` (VS Code `settings.json`)

```
"tailwindCSS.experimental.classRegex": [
    ["const\\s+css\\s*\\=\\s*\\{([^\\}]*)\\}", "[\"'`]([^\"'`]*).*?[\"'`]"]
],
```

<br/>

### Project Structure

Project is structured in `global` and `features` components.

Each feature is a folder which contains all the files related to that feature.
App routes are defined in `src/routes.jsx` file.

```
.
├── ...
├── src                     # Source files
│   ├── features            # Project features
│   │   ├── add-release     # Add release (create) feature
│   │   ├── auth            # User auth feature
│   │   ├── player          # Music player feature
│   │   └── release         # Release (frontend) feature
│   ├── ...
│   ├── main.jsx            # Main entry point
│   └── routes.jsx          # App routes
└── ...
```

<br/>

### Code style

#### - Tailwind CSS + SCSS

Tailwind is the primary design system used in this project, as it reduces the final CSS bundle size by removing unused
styles and avoids repetition of CSS rules.

Full utility classes: https://tailwindcss.com/docs

To make it easier to read and maintain, Tailwind classes are grouped in `const css = {}` object on top of each `.jsx`
file.

```
const css = {
  container: 'max-w-6xl mx-auto px-4 ...',
  ctaBtn: 'inline-flex items-center justify-center ...',
}

export default function Header() {
    return (...)
}
```
