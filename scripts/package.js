// Zips the contents of dist/ (including .htaccess) into portfolio-site.zip for cPanel upload.
import AdmZip from 'adm-zip'
import { existsSync, rmSync } from 'node:fs'

const OUT = 'portfolio-site.zip'

if (!existsSync('dist/index.html')) {
  console.error('dist/ is missing. Run "npm run build" first.')
  process.exit(1)
}

rmSync(OUT, { force: true })
const zip = new AdmZip()
zip.addLocalFolder('dist')
zip.writeZip(OUT)

const entries = zip.getEntries().map((e) => e.entryName)
console.log(`Created ${OUT} with ${entries.length} files`)
if (!entries.includes('.htaccess')) console.warn('Warning: .htaccess is missing from the zip')
