import fs from 'fs';
import licenseData from './licenses.json' assert { type: 'json' };

let markdown = '# Third-Party Licenses\n\nThis project uses the following third-party libraries:\n\n';

for (let packageName in licenseData) {
  const pkgInfo = licenseData[packageName];
  
  markdown += `## ${packageName}@${pkgInfo.version}\n`;
  markdown += `- **License**: ${pkgInfo.licenses}\n`;
  markdown += `- **Repository**: [${pkgInfo.repository}](${pkgInfo.repository})\n\n`;
}

markdown += '---\n\n';
markdown += '## License Summary\n\n';
markdown += 'The above third-party libraries are licensed under their respective licenses. Please refer to the linked repositories for more detailed licensing information.\n';

fs.writeFileSync('THIRDPARTYLICENSES.md', markdown);

console.log('LICENSES.md file has been generated!');
