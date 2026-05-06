const fs = require('fs');
const path = require('path');

const dir = './lib/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already contains profileLink
  if (content.includes('header.profileLink')) {
    return;
  }

  // Common patterns for contact info:
  // <div className="...">...{header.email}</div>
  // <span>{header.email}</span>
  // <div><Phone ... /> {header.phone}</div>
  
  // We'll look for the line containing {header.phone}
  const lines = content.split('\n');
  const phoneIndex = lines.findIndex(l => l.includes('{header.phone}'));
  
  if (phoneIndex !== -1) {
    let phoneLine = lines[phoneIndex];
    // Replace header.phone with header.profileLink
    let profileLine = phoneLine.replace('{header.phone}', '{header.profileLink}');
    
    // Also change the icon if there's one like <Phone /> or <Smartphone />
    profileLine = profileLine.replace(/<Phone\b[^>]*>/, '{header.profileLabel || "Link"}: ')
                             .replace(/<Smartphone\b[^>]*>/, '{header.profileLabel || "Link"}: ')
                             .replace(/<Mail\b[^>]*>/, '{header.profileLabel || "Link"}: ')
                             .replace(/<AtSign\b[^>]*>/, '{header.profileLabel || "Link"}: ')
                             .replace(/<MapPin\b[^>]*>/, '{header.profileLabel || "Link"}: ');
                             
    // Add conditional rendering
    profileLine = profileLine.replace(/^(\s*)(.*)$/, '$1{header.profileLink && ($2)}');

    lines.splice(phoneIndex + 1, 0, profileLine);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Added profileLink to ${file}`);
  } else {
    console.log(`Could not find header.phone in ${file}`);
  }
});
