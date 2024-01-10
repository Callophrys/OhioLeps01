import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

export default async function () {

    console.log('Creating country records');
    const countries = await db.country.createMany({
        data: [
            { abbreviation: 'US', name: 'United States of America' },
            { abbreviation: 'CA', name: 'Canada' },
        ]
    });

    console.log('Creating state records');
    await db.country.update({
        where: {
            abbreviation: 'US'
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
                    ]
                }
            }
        }
    });

    await db.country.update({
        where: {
            abbreviation: 'CA'
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
                    ]
                }
            }
        }
    });

    console.log('Creating region records');
    const ohio = await db.state.findFirst({
        where: {
            abbreviation: 'OH'
        },
        select: {
            id: true
        }
    });

    const ohioId: number = ohio?.id ?? 0;

    await db.state.update({
        where: {
            id: ohioId
        },
        data: {
            regions: {
                createMany: {
                    data:
                        [
                            { name: 'Region1' },
                            { name: 'Region2' },
                            { name: 'Region3' },
                            { name: 'Region4' },
                            { name: 'Region5' },
                        ]
                }
            }
        }
    });

    console.log('Creating county records');
    const regions = await db.region.findMany();
    const region1Id: number = regions.find((r: any) => r.name === 'Region1')?.id ?? 0;
    const region2Id: number = regions.find((r: any) => r.name === 'Region2')?.id ?? 0;
    const region3Id: number = regions.find((r: any) => r.name === 'Region3')?.id ?? 0;
    const region4Id: number = regions.find((r: any) => r.name === 'Region4')?.id ?? 0;
    const region5Id: number = regions.find((r: any) => r.name === 'Region5')?.id ?? 0;

    await db.region.update({
        where: {
            id: region1Id
        },
        data: {
            counties: {
                createMany: {
                    data:
                        [
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
                        ]
                }
            }
        }
    });

    await db.region.update({
        where: {
            id: region2Id
        },
        data: {
            counties: {
                createMany: {
                    data:
                        [
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
                        ]
                }
            }
        }
    });

    await db.region.update({
        where: {
            id: region3Id
        },
        data: {
            counties: {
                createMany: {
                    data:
                        [
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
                        ]
                }
            }
        }
    });

    await db.region.update({
        where: {
            id: region4Id
        },
        data: {
            counties: {
                createMany: {
                    data:
                        [
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
                        ]
                }
            }
        }
    });

    await db.region.update({
        where: {
            id: region5Id
        },
        data: {
            counties: {
                createMany: {
                    data:
                        [
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
                        ]
                }
            }
        }
    });

}
