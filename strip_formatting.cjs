const fs = require('fs');
const path = require('path');

const docsDir = 'c:/Users/JosephAjemrona/Desktop/FRONT-END/1 VIBE CODING ASSESSMENT/The Wahala Sorter/docs';

fs.readdirSync(docsDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(docsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove all **
    content = content.replace(/\*\*/g, '');

    // Remove all ## (usually followed by a space, let's clean both '## ' at start of line and general '##')
    content = content.replace(/(^|\n)##[ \t]*/g, '$1');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed ${file}`);
  }
});
