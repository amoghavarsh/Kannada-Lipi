/* Quick pre-deploy scan: flag named imports that appear unused in each page. */
const fs = require('fs');
const path = require('path');

const dirs = ['src/pages', 'src/components'];
let issues = 0;

for (const dir of dirs) {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.jsx'))) {
    const full = path.join(dir, f);
    const src = fs.readFileSync(full, 'utf8');
    const importLines = src.match(/import\s*\{([^}]+)\}\s*from/g) || [];
    const names = new Set();
    importLines.forEach((line) => {
      line.replace(/import\s*\{([^}]+)\}\s*from/, '$1').split(',').forEach((n) => {
        const name = n.trim().split(' as ').pop().trim();
        if (name) names.add(name);
      });
    });
    const body = src.replace(/import[^;]+;/g, '');
    for (const n of names) {
      const re = new RegExp('\\b' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (!re.test(body)) {
        console.log('UNUSED import "' + n + '" in ' + full);
        issues++;
      }
    }
  }
}

console.log(issues === 0 ? '✓ No unused named imports found.' : issues + ' potential unused import(s).');
