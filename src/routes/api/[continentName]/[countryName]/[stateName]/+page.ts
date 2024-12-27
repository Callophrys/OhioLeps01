import { error } from '@sveltejs/kit';
import { toProperNoun } from '$lib/utils';

export async function load({ params, fetch }: { params: any, fetch: any }) {

    const {
        continentName,
        countryName,
        stateName,
    } = params;

    if (!/^[a-zA-Z0-9_-]+$/.test(continentName)) throw error(400, 'Invalid SVG path');
    if (!/^[a-zA-Z0-9_-]+$/.test(countryName)) throw error(400, 'Invalid SVG path');
    if (!/^[a-zA-Z0-9_-]+$/.test(stateName)) throw error(400, 'Invalid SVG path');

    const response = await fetch(`/svg/${continentName}/${countryName}/${stateName}.svg`);
    if (!response.ok) {
        throw error(404, 'SVG not found');
    }

    const svg = await response.text();

    return {
        svgId: `svg_${stateName}`,
        countryName: toProperNoun(countryName),
        stateName: toProperNoun(stateName),
        svgContent: svg,
    };
}
