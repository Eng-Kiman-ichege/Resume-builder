const fs = require('fs');
const path = require('path');

const dir = './lib/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix 1: Skills split error
  content = content.replace(/skills\.content\.split\(\s*['"]\,['"]\s*\)/g, '(skills?.content || "").split(",").filter(Boolean)');
  
  // Fix 2: Field of study
  content = content.replace(/\{edu\.degree\}/g, '{edu.degree}{edu.field ? " in " + edu.field : ""}');

  // Fix 3: Profile Link 
  // Let's check if the template uses Globe icon. If not, we won't auto-inject to avoid breaking layout, we'll do it manually.

  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
});
