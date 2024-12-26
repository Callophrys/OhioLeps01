import fs from 'fs/promises';
import { getCountySpecimens } from '$lib/database/counties';
import jalisco from '$lib/assets/svgs/north_america/mexico/jalisco.svg';

export async function load({ params }: { params: any }) {

    let continentName = Number(params.continentName);
    let countryName = Number(params.countryName);
    let countyName = Number(params.countyName);

    //console.log(CountySpecimens);
    console.log(continentName);
    console.log(countryName);
    console.log(countyName);

    const svgContent: any = { foo: 'boar' };
    console.log(svgContent);

    return { svgConentent: svgContent };
}
