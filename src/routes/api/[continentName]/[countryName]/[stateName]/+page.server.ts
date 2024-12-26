import fs from 'fs/promises';
import path from 'path';

export async function load({ params }: { params: any }) {

    let continentName = String(params.continentName);
    let countryName = String(params.countryName);
    let stateName = String(params.stateName);

    const filePath = path.resolve(`src/lib/assets/svg/${continentName}/${countryName}/${stateName}.svg`);
    const htmlContent = await fs.readFile(filePath, 'utf-8');

    return { svgId: `svg_${stateName}`, svgContent: htmlContent };
}
