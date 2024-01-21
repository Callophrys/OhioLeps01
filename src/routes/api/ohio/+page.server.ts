import { getCountySpecimens } from "$lib/database/counties";

export async function load() {

    type crIn = { county: string, region: string }
    type csIn = { county: string, region: string, commonname: string}

    const countySpecimens = await getCountySpecimens();
    //console.log(countySpecimens);
	const json = JSON.stringify(countySpecimens);
	const jsonResult: csIn[] = JSON.parse(json);
    //console.log(jsonResult);
    
    const uqCounties: string[] = [...new Set(jsonResult.map((c: csIn) => c.county ))];
    console.log(uqCounties);
    const newResult = uqCounties.map((county: string) => {
        return {
            county: county,
            species: [...new Set(jsonResult.filter((x: csIn) => x.county === county).map((f: csIn) => ({
                region: f.region,
                commonName: f.commonname
            })))]
        }
    });
    //console.log(newResult);
	return { countySpecimens: newResult }
}
