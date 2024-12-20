import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export default async function () {
    console.log('Creating country records');
    await db.continent.create({
        data: {
            abbreviation: 'NA',
            name: 'North America',
            countries: {
                create: [
                    { abbreviation: 'US', name: 'United States of America' },
                    { abbreviation: 'CA', name: 'Canada' },
                    { abbreviation: 'MX', name: 'Mexico' },
                ],
            },
        },
    });

    /*
    Example of geogrphic regions of a country - Canada
        Atlantic
        Quebec
        Ontario
        Prairies
        British Columbia
        Territories
    */

    console.log('Creating state records');
    await db.country.update({
        where: {
            abbreviation: 'US',
        },
        data: {
            states: {
                createMany: {
                    data: [
                        { abbreviation: 'AK', name: 'Alaska' },
                        { abbreviation: 'AL', name: 'Alabama' },
                        { abbreviation: 'AR', name: 'Arkansas' },
                        { abbreviation: 'AZ', name: 'Arizona' },
                        { abbreviation: 'CA', name: 'California' },
                        { abbreviation: 'CO', name: 'Colorado' },
                        { abbreviation: 'CT', name: 'Connecticut' },
                        { abbreviation: 'DC', name: 'District of Columbia' },
                        { abbreviation: 'DE', name: 'Delaware' },
                        { abbreviation: 'FL', name: 'Florida' },
                        { abbreviation: 'GA', name: 'Georgia' },
                        { abbreviation: 'HI', name: 'Hawaii' },
                        { abbreviation: 'IA', name: 'Iowa' },
                        { abbreviation: 'ID', name: 'Idaho' },
                        { abbreviation: 'IL', name: 'Illinois' },
                        { abbreviation: 'IN', name: 'Indiana' },
                        { abbreviation: 'KS', name: 'Kansas' },
                        { abbreviation: 'KY', name: 'Kentucky' },
                        { abbreviation: 'LA', name: 'Louisiana' },
                        { abbreviation: 'MA', name: 'Massachusetts' },
                        { abbreviation: 'MD', name: 'Maryland' },
                        { abbreviation: 'ME', name: 'Maine' },
                        { abbreviation: 'MI', name: 'Michigan' },
                        { abbreviation: 'MN', name: 'Minnesota' },
                        { abbreviation: 'MO', name: 'Missouri' },
                        { abbreviation: 'MS', name: 'Mississippi' },
                        { abbreviation: 'MT', name: 'Montana' },
                        { abbreviation: 'NC', name: 'North Carolina' },
                        { abbreviation: 'ND', name: 'North Dakota' },
                        { abbreviation: 'NE', name: 'Nebraska' },
                        { abbreviation: 'NH', name: 'New Hampshire' },
                        { abbreviation: 'NJ', name: 'New Jersey' },
                        { abbreviation: 'NM', name: 'New Mexico' },
                        { abbreviation: 'NV', name: 'Nevada' },
                        { abbreviation: 'NY', name: 'New York' },
                        { abbreviation: 'OH', name: 'Ohio' },
                        { abbreviation: 'OK', name: 'Oklahoma' },
                        { abbreviation: 'OR', name: 'Oregon' },
                        { abbreviation: 'PA', name: 'Pennsylvania' },
                        { abbreviation: 'RI', name: 'Rhode Island' },
                        { abbreviation: 'SC', name: 'South Carolina' },
                        { abbreviation: 'SD', name: 'South Dakota' },
                        { abbreviation: 'TN', name: 'Tennessee' },
                        { abbreviation: 'TX', name: 'Texas' },
                        { abbreviation: 'UT', name: 'Utah' },
                        { abbreviation: 'VA', name: 'Virginia' },
                        { abbreviation: 'VT', name: 'Vermont' },
                        { abbreviation: 'WA', name: 'Washington' },
                        { abbreviation: 'WI', name: 'Wisconsin' },
                        { abbreviation: 'WV', name: 'West Virginia' },
                        { abbreviation: 'WY', name: 'Wyoming' },
                    ],
                },
            },
        },
    });

    await db.country.update({
        where: {
            abbreviation: 'CA',
        },
        data: {
            states: {
                createMany: {
                    data: [
                        { abbreviation: 'AB', name: 'Province Code Alberta' },
                        { abbreviation: 'BC', name: 'British Columbia' },
                        { abbreviation: 'MB', name: 'Manitoba' },
                        { abbreviation: 'NB', name: 'New Brunswick' },
                        { abbreviation: 'NL', name: 'Newfoundland and Labrador' },
                        { abbreviation: 'NS', name: 'Nova Scotia' },
                        { abbreviation: 'NT', name: 'Northwest Territories' },
                        { abbreviation: 'NU', name: 'Nunavut' },
                        { abbreviation: 'ON', name: 'Ontario' },
                        { abbreviation: 'PE', name: 'Prince Edward Island' },
                        { abbreviation: 'QC', name: 'Quebec' },
                        { abbreviation: 'SK', name: 'Saskatchewan' },
                        { abbreviation: 'YT', name: 'Yukon' },
                    ],
                },
            },
        },
    });

    // pais > estado > mu
    await db.country.update({
        where: {
            abbreviation: 'MX',
        },
        data: {
            states: {
                createMany: {
                    data: [
                        { abbreviation: 'AG', name: 'Aguascalientes' },
                        { abbreviation: 'BN', name: 'Baja California' },
                        { abbreviation: 'BS', name: 'Baja California Sur' },
                        { abbreviation: 'CP', name: 'Campeche' },
                        { abbreviation: 'CS', name: 'Chiapas' },
                        { abbreviation: 'CI', name: 'Chihuahua' },
                        { abbreviation: 'CH', name: 'Coahuila' },
                        { abbreviation: 'CL', name: 'Colima' },
                        { abbreviation: 'DG', name: 'Durango' },
                        { abbreviation: 'GJ', name: 'Guanajuato' },
                        { abbreviation: 'GE', name: 'Guerrero' },
                        { abbreviation: 'HD', name: 'Hidalgo' },
                        { abbreviation: 'JA', name: 'Jalisco' },
                        { abbreviation: 'MC', name: 'Michoacán' },
                        { abbreviation: 'MR', name: 'Morelos' },
                        { abbreviation: 'MX', name: 'México' },
                        { abbreviation: 'CDMX', name: 'México, Cuidad de' },
                        { abbreviation: 'NA', name: 'Nayarit' },
                        { abbreviation: 'NL', name: 'Nuevo León' },
                        { abbreviation: 'OA', name: 'Oaxaca' },
                        { abbreviation: 'PU', name: 'Puebla' },
                        { abbreviation: 'QE', name: 'Querétaro' },
                        { abbreviation: 'QI', name: 'Quintana Roo Roo. or Q.R.' },
                        { abbreviation: 'SL', name: 'San Luis Potosí' },
                        { abbreviation: 'SI', name: 'Sinaloa' },
                        { abbreviation: 'SO', name: 'Sonora' },
                        { abbreviation: 'TB', name: 'Tabasco' },
                        { abbreviation: 'TA', name: 'Tamaulipas' },
                        { abbreviation: 'TL', name: 'Tlaxcala' },
                        { abbreviation: 'VC', name: 'Veracruz' },
                        { abbreviation: 'YU', name: 'Yucatán' },
                        { abbreviation: 'ZA', name: 'Zacatecas' },
                    ],
                },
            },
        },
    });

    console.log('Creating region records');
    const ohio = await db.state.findFirst({
        where: {
            abbreviation: 'OH',
        },
        select: {
            id: true,
        },
    });

    const ohioId: number = ohio?.id ?? 0;

    console.log('Creating region records');
    const jalisco = await db.state.findFirst({
        where: {
            abbreviation: 'JA',
        },
        select: {
            id: true,
        },
    });

    const jaliscoId: number = jalisco?.id ?? 0;

    await db.state.update({
        where: {
            id: ohioId,
        },
        data: {
            stateRegions: {
                createMany: {
                    data: [{ name: 'Region1' }, { name: 'Region2' }, { name: 'Region3' }, { name: 'Region4' }, { name: 'Region5' }],
                },
            },
        },
    });

    console.log('Creating county records');
    const stateRegions = await db.stateRegion.findMany();
    const region1Id: number = stateRegions.find((r: any) => r.name === 'Region1')?.id ?? 0;
    const region2Id: number = stateRegions.find((r: any) => r.name === 'Region2')?.id ?? 0;
    const region3Id: number = stateRegions.find((r: any) => r.name === 'Region3')?.id ?? 0;
    const region4Id: number = stateRegions.find((r: any) => r.name === 'Region4')?.id ?? 0;
    const region5Id: number = stateRegions.find((r: any) => r.name === 'Region5')?.id ?? 0;

    await db.stateRegion.update({
        where: {
            id: region1Id,
        },
        data: {
            counties: {
                createMany: {
                    data: [
                        { name: 'Champaign', stateId: ohioId },
                        { name: 'Delaware', stateId: ohioId },
                        { name: 'Fairfield', stateId: ohioId },
                        { name: 'Fayette', stateId: ohioId },
                        { name: 'Franklin', stateId: ohioId },
                        { name: 'Knox', stateId: ohioId },
                        { name: 'Licking', stateId: ohioId },
                        { name: 'Logan', stateId: ohioId },
                        { name: 'Madison', stateId: ohioId },
                        { name: 'Marion', stateId: ohioId },
                        { name: 'Morrow', stateId: ohioId },
                        { name: 'Pickaway', stateId: ohioId },
                        { name: 'Union', stateId: ohioId },
                    ],
                },
            },
        },
    });

    await db.stateRegion.update({
        where: {
            id: region2Id,
        },
        data: {
            counties: {
                createMany: {
                    data: [
                        { name: 'Ashland', stateId: ohioId },
                        { name: 'Ashtabula', stateId: ohioId },
                        { name: 'Carroll', stateId: ohioId },
                        { name: 'Columbiana', stateId: ohioId },
                        { name: 'Cuyahoga', stateId: ohioId },
                        { name: 'Geauga', stateId: ohioId },
                        { name: 'Harrison', stateId: ohioId },
                        { name: 'Holmes', stateId: ohioId },
                        { name: 'Jefferson', stateId: ohioId },
                        { name: 'Lake', stateId: ohioId },
                        { name: 'Lorain', stateId: ohioId },
                        { name: 'Mahoning', stateId: ohioId },
                        { name: 'Medina', stateId: ohioId },
                        { name: 'Portage', stateId: ohioId },
                        { name: 'Stark', stateId: ohioId },
                        { name: 'Summit', stateId: ohioId },
                        { name: 'Trumbull', stateId: ohioId },
                        { name: 'Tuscarawas', stateId: ohioId },
                        { name: 'Wayne', stateId: ohioId },
                    ],
                },
            },
        },
    });

    await db.stateRegion.update({
        where: {
            id: region3Id,
        },
        data: {
            counties: {
                createMany: {
                    data: [
                        { name: 'Allen', stateId: ohioId },
                        { name: 'Crawford', stateId: ohioId },
                        { name: 'Defiance', stateId: ohioId },
                        { name: 'Erie', stateId: ohioId },
                        { name: 'Fulton', stateId: ohioId },
                        { name: 'Hancock', stateId: ohioId },
                        { name: 'Hardin', stateId: ohioId },
                        { name: 'Henry', stateId: ohioId },
                        { name: 'Huron', stateId: ohioId },
                        { name: 'Lucas', stateId: ohioId },
                        { name: 'Ottawa', stateId: ohioId },
                        { name: 'Paulding', stateId: ohioId },
                        { name: 'Putnam', stateId: ohioId },
                        { name: 'Richland', stateId: ohioId },
                        { name: 'Sandusky', stateId: ohioId },
                        { name: 'Seneca', stateId: ohioId },
                        { name: 'Vanwert', stateId: ohioId },
                        { name: 'Williams', stateId: ohioId },
                        { name: 'Wood', stateId: ohioId },
                        { name: 'Wyandot', stateId: ohioId },
                    ],
                },
            },
        },
    });

    await db.stateRegion.update({
        where: {
            id: region4Id,
        },
        data: {
            counties: {
                createMany: {
                    data: [
                        { name: 'Athens', stateId: ohioId },
                        { name: 'Belmont', stateId: ohioId },
                        { name: 'Coshocton', stateId: ohioId },
                        { name: 'Gallia', stateId: ohioId },
                        { name: 'Guernsey', stateId: ohioId },
                        { name: 'Hocking', stateId: ohioId },
                        { name: 'Jackson', stateId: ohioId },
                        { name: 'Lawrence', stateId: ohioId },
                        { name: 'Meigs', stateId: ohioId },
                        { name: 'Monroe', stateId: ohioId },
                        { name: 'Morgan', stateId: ohioId },
                        { name: 'Muskingum', stateId: ohioId },
                        { name: 'Noble', stateId: ohioId },
                        { name: 'Perry', stateId: ohioId },
                        { name: 'Pike', stateId: ohioId },
                        { name: 'Ross', stateId: ohioId },
                        { name: 'Scioto', stateId: ohioId },
                        { name: 'Vinton', stateId: ohioId },
                        { name: 'Washington', stateId: ohioId },
                    ],
                },
            },
        },
    });

    await db.stateRegion.update({
        where: {
            id: region5Id,
        },
        data: {
            counties: {
                createMany: {
                    data: [
                        { name: 'Adams', stateId: ohioId },
                        { name: 'Auglaize', stateId: ohioId },
                        { name: 'Brown', stateId: ohioId },
                        { name: 'Butler', stateId: ohioId },
                        { name: 'Clark', stateId: ohioId },
                        { name: 'Clermont', stateId: ohioId },
                        { name: 'Clinton', stateId: ohioId },
                        { name: 'Darke', stateId: ohioId },
                        { name: 'Greene', stateId: ohioId },
                        { name: 'Hamilton', stateId: ohioId },
                        { name: 'Highland', stateId: ohioId },
                        { name: 'Mercer', stateId: ohioId },
                        { name: 'Miami', stateId: ohioId },
                        { name: 'Montgomery', stateId: ohioId },
                        { name: 'Preble', stateId: ohioId },
                        { name: 'Shelby', stateId: ohioId },
                        { name: 'Warren', stateId: ohioId },
                    ],
                },
            },
        },
    });

    /*
001	Acatic	23,175
002	Acatlán de Juárez	25,250
003	Ahualulco de Mercado	23,630
004	Amacueca	5,743
005	Amatitán	16,490
006	Ameca	60,386
007	San Juanito de Escobedo	9,433
008	Arandas	80,609
009	El Arenal	21,115
010	Atemajac de Brizuela	7,758
011	Atengo	5,599
012	Atenguillo	4,176
013	Atotonilco el Alto	64,009
014	Atoyac	8,689
015	Autlán de Navarro	64,931
016	Ayotlán	41,552
017	Ayutla	12,880
018	La Barca	67,937
019	Bolaños	7,043
020	Cabo Corrientes	10,940
021	Casimiro Castillo	20,548
022	Cihuatlán	40,139
023	Zapotlán el Grande	115,141
024	Cocula	29,267
025	Colotlán	19,689
026	Concepción de Buenos Aires	6,334
027	Cuautitlán de García Barragán	18,370
028	Cuautla	2,166
029	Cuquío	17,820
030	Chapala	55,196
031	Chimaltitán	3,270
032	Chiquilistlán	5,983
033	Degollado	21,226
034	Ejutla	1,981
035	Encarnación de Díaz	53,039
036	Etzatlán	20,011
037	El Grullo	25,920
038	Guachinango	4,199
039	Guadalajara	1,385,629
040	Hostotipaquillo	8,732
041	Huejúcar	5,920
042	Huejuquilla el Alto	10,015
043	La Huerta	23,258
044	Ixtlahuacán de los Membrillos	67,969
045	Ixtlahuacán del Río	20,465
046	Jalostotitlán	32,678
047	Jamay	24,894
048	Jesús María	18,982
049	Jilotlán de los Dolores	9,425
050	Jocotepec	47,105
051	Juanacatlán	30,855
052	Juchitlán	5,534
053	Lagos de Moreno	172,403
054	El Limón	5,368
055	Magdalena	21,781
056	Santa María del Oro	1,815
057	La Manzanilla de la Paz	4,099
058	Mascota	14,451
059	Mazamitla	14,043
060	Mexticacán	5,307
061	Mezquitic	22,083
062	Mixtlán	3,638
063	Ocotlán	106,050
064	Ojuelos de Jalisco	33,588
065	Pihuamo	11,386
066	Poncitlán	53,659
067	Puerto Vallarta	291,839
068	Villa Purificación	11,303
069	Quitupan	7,734
070	El Salto	232,852
071	San Cristóbal de la Barranca	2,924
072	San Diego de Alejandría	7,609
073	San Juan de los Lagos	72,230
074	San Julián	16,792
075	San Marcos	3,791
076	San Martín de Bolaños	3,095
077	San Martín Hidalgo	28,102
078	San Miguel el Alto	31,965
079	Gómez Farías	16,431
080	San Sebastián del Oeste	5,086
081	Santa María de los Ángeles	3,515
082	Sayula	37,186
083	Tala	87,690
084	Talpa de Allende	14,997
085	Tamazula de Gordiano	38,955
086	Tapalpa	21,245
087	Tecalitlán	16,705
088	Techaluta de Montenegro	4,072
089	Tecolotlán	16,603
090	Tenamaxtlán	7,302
091	Teocaltiche	39,839
092	Teocuitatlán de Corona	11,039
093	Tepatitlán de Morelos	150,190
094	Tequila	44,353
095	Teuchitlán	9,647
096	Tizapán el Alto	22,758
097	Tlajomulco de Zúñiga	727,750
098	San Pedro Tlaquepaque	687,127
099	Tolimán	11,219
100	Tomatlán	36,316
101	Tonalá	569,913
102	Tonaya	5,961
103	Tonila	7,565
104	Totatiche	4,180
105	Tototlán	23,573
106	Tuxcacuesco	5,482
107	Tuxcueca	6,702
108	Tuxpan	37,518
109	Unión de San Antonio	19,069
110	Unión de Tula	13,799
111	Valle de Guadalupe	6,627
112	Valle de Juárez	6,151
113	San Gabriel	16,548
114	Villa Corona	19,063
115	Villa Guerrero	5,525
116	Villa Hidalgo	20,088
117	Cañadas de Obregón	4,388
118	Yahualica de González Gallo	22,394
119	Zacoalco de Torres	30,472
120	Zapopan	1,476,491
121	Zapotiltic	33,713
122	Zapotitlán de Vadillo	7,466
123	Zapotlán del Rey	19,279
124	Zapotlanejo	64,806
125	San Ignacio Cerro Gordo	18,341


Regions of Jalisco
Northwestern Plains and Sierras, Sierra Madre Occidental, Central Plateau, Trans-Mexican Volcanic Belt, which covers most of the state, and the Sierra Madre del Sur


"Altos Norte"
    Villa Hidalgo
    Unión de San Antonio
    Teocaltiche
    San Juan de los Lagos
    San Diego de Alejandría
    Ojuelos de Jalisco
    Lagos de Moreno
    Encarnación de Díaz

"Altos Sur"
    Yahualica de González Gallo
    Valle de Guadalupe
    Tepatitlán de Morelos
    San Miguel el Alto
    San Julián
    San Ignacio Cerro Gordo
    Mexticacán
    Jesús María
    Jalostotitlán
    Cañadas de Obregón
    Arandas
    Acatic

"Centro"
    Zapotlanejo
    Zapopan
    Villa Corona
    Tonalá
    Tlaquepaque
    Tlajomulco de Zúñiga
    San Cristóbal de la Barranca
    Juanacatlán
    Ixtlahuacán del Río
    Ixtlahuacán de los Membrillos
    Guadalajara
    El Salto
    Cuquío
    Acatlán de Juárez

"Ciénega"
    Zapotlán del Rey
    Tuxcueca
    Tototlán
    Tizapán El Alto
    Poncitlán
    Ocotlán
    La Barca
    Jocotepec
    Jamay
    Degollado
    Chapala
    Ayotlán
    Atotonilco El Alto

"Costa Norte"
    Tomatlán
    Puerto Vallarta
    Cabo Corrientes

"Costa Sur"
    Villa Purificación
    La Huerta
    Cuautitlán de García Barragán
    Cihuatlán
    Casimiro Castillo
    Autlán de Navarro

"Norte"
    Villa Guerrero
    Totatiche
    Santa María de los Ángeles
    San Martín de Bolaños
    Mezquitic
    Huejúcar
    Huejuquilla El Alto
    Colotlán
    Chimaltitán,
    Bolaños

"Sierra de Amula"
    Unión de Tula
    Tuxcacuesco
    Tonaya
    Tenamaxtlán
    Tecolotlán
    Juchitlán
    El Limón
    El Grullo
    Ejutla
    Chiquilistlán
    Atengo

"Sierra Occidental"
    Talpa de Allende
    San Sebastián del Oeste
    Mixtlán
    Mascota
    Guachinango
    Cuautla
    Ayutla
    Atenguillo

"Sur"
    Amacueca
    Atemajac de Brizuela
    Atoyac
    Gómez Farías
    San Gabriel
    Sayula
    Tapalpa
    Techaluta de Montenegro
    Teocuitatlán de Corona
    Tolimán
    Tonila
    Túxpan
    Zacoalco de Torres
    Zapotiltic
    Zapotitlán de Vadillo,
    Zapotlán el Grande

"Sureste"
    Valle de Juárez
    Tecalitlán
    Tamazula de Gordiano
    Santa María del Oro
    Quitupan
    Pihuamo
    Mazamitla
    La Manzanilla de La Paz
    Jilotlán de los Dolores
    Concepción de Buenos Aires

"Valles"
    Teuchitlán
    Tequila
    Tala
    San Martín Hidalgo
    San Marco
    San Juanito de Escobedo
    Magdalena, Municipio de
    Jalisco
    Hostotipaquillo
    Etzatlán
    El Arenal
    Cocula
    Ameca
    Amatitán
    Ahualulco de Mercado

    await db.state.update({
        where: {
            id: jaliscoId
        },
        data: {
            regions: {
                createMany: {
                    data:
                        [
                            { name: 'Altos Norte' },
                        ]
                }
            }
        }
    });

    const xregions = await db.region.findMany();
    const xregion1Id: number = regions.find((r: any) => r.name === 'Region1')?.id ?? 0;

    await db.region.update({
        where: {
            id: Number(regions.find((r: any) => r.name === 'Altos Norte')?.id ?? 0)
        },
        data: {
            counties: {
                createMany: {
                    data:
                        [
                            { id: 116, name: 'Villa Hidalgo', stateId: jaliscoId },
                        ]
                }
            }
        }
    });
    */
}
