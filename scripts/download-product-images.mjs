import fs from 'fs';
import path from 'path';
import https from 'https';

const productsDir = path.resolve('public/images/nubl/products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Curated dark luxury, moody, obsidian/travertine/smoke imagery matching NUBL palette
const imageMap = {
  // Incense (بخور)
  'incense-royal-main.jpg': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop',
  'incense-aged-main.jpg': 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop',
  'incense-sukoun-main.jpg': 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1000&auto=format&fit=crop',
  'incense-athar-main.jpg': 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
  'incense-box-luxury.jpg': 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=1000&auto=format&fit=crop',

  // Burners (مباخر)
  'burner-gold-main.jpg': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
  'burner-darkstone-main.jpg': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
  'burner-sukoun-main.jpg': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop',
  'burner-ceramic-main.jpg': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop',

  // Perfumes (عطور)
  'perfume-nubl-main.jpg': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
  'perfume-athar-main.jpg': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
  'perfume-sukoun-main.jpg': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
  'perfume-oud-main.jpg': 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop',
  'perfume-layali-main.jpg': 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop',
  'perfume-private-reserve.jpg': 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000&auto=format&fit=crop',

  // Accessories (إكسسوارات)
  'accessory-tongs.jpg': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
  'accessory-tray.jpg': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
  'accessory-holder.jpg': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
  'accessory-lighter.jpg': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',

  // Gifts (أطقم الهدايا)
  'gift-royal-set.jpg': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
  'gift-hospitality-set.jpg': 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop',
  'gift-luxury-box.jpg': 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000&auto=format&fit=crop',
};

async function download(name, url) {
  const dest = path.join(productsDir, name);
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const file = fs.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', () => resolve());
      } else {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', () => resolve());
  });
}

async function run() {
  console.log('Downloading curated product assets...');
  for (const [filename, url] of Object.entries(imageMap)) {
    process.stdout.write(`Fetching ${filename}... `);
    await download(filename, url);
    console.log('done.');
  }
  console.log('All product assets saved!');
}

run();
