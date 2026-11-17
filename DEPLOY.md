# Deploying the portfolio

Target: **https://pugal.techcmantix.in** on cPanel (Apache).

The site is a static React (Vite) build: no database, no API, no secrets. Apache serves the files directly. `public/.htaccess` ships inside the build and handles page routing, caching, compression and security headers.

## 1. Create the subdomain (once)
1. cPanel → **Domains** → **Create A New Domain**.
2. Domain: `pugal.techcmantix.in`. Uncheck "Share document root" so it gets its own folder (for example `/home/<cpanel-user>/pugal.techcmantix.in`).
3. If the domain's DNS is managed outside this cPanel, add an **A record** for `pugal` pointing to the server IP shown on the cPanel home page ("Shared IP Address").

## 2. Turn on HTTPS (once)
cPanel → **SSL/TLS Status** → select `pugal.techcmantix.in` → **Run AutoSSL**. This can take a few minutes after DNS starts working.

## 3. Build and upload
On your computer:
```bash
npm ci
npm run package      # builds the site and creates portfolio-site.zip
```
In cPanel → **File Manager**:
1. Open the subdomain's document root folder.
2. **Upload** `portfolio-site.zip`.
3. Right-click the zip → **Extract** into the same folder, then delete the zip.
4. Check that `.htaccess`, `index.html`, `favicon.svg` and the `assets/` folder are in the document root (not in a subfolder). To see `.htaccess`, go to **Settings** → **Show Hidden Files**.

## 4. Check it
- Open https://pugal.techcmantix.in. The page and the 3D shapes should load.
- Once HTTPS works, edit `.htaccess` in File Manager and remove the `#` from the two "Force HTTPS" lines. (You can also do this in `public/.htaccess` so future builds include it.)

## Updating the site
Run `npm run package` again, upload the new zip, extract it and overwrite. Old files in `assets/` can be deleted; new builds use new file names.

## Alternative: run it as a Node.js app
Only needed if the site later gets server-side features, such as a contact form that sends email.
1. cPanel → **Setup Node.js App** → **Create Application**: Node 20+, application root `portfolio-app`, URL `pugal.techcmantix.in`, startup file `server.js`.
2. Upload `server.js`, `package.json`, `package-lock.json` and the built `dist/` folder into `portfolio-app`.
3. Click **Run NPM Install**, then **Restart**.

`server.js` reads the `PORT` that cPanel provides and exposes `/health` for monitoring. Running it locally: `npm run build && npm start` (http://localhost:3000).
