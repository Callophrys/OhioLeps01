import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

export default async function() {
    console.log('Creating family-genus records');
    await db.taxonomyFamily.upsert({ data:
    {
        family: "Papilionidae",
        familyDescription: "swallowtails and parnassians",
        familySpeciesCount: 40,
        subfamilies: {
            create: [
                {
                    subfamily: "Parnassiinae",
                    subfamilyDescription: "parnassians",
                    subfamilySpeciesCount: 3,
                },
                {
                    subfamily: "Papilioninae",
                    subfamilyDescription: "swallowtails",
                    subfamilySpeciesCount: 37,
                }
            ]
        }
    }});
}

let foo =
[
    {
        family: "Hesperiidae",
        familyDescription: "skippers",
        familySpeciesCount: 300,
        subfamilies: [
            {
                subfamily: "Pyrrhopyginae",
                subfamilyDescription: "firetips",
                subfamilySpeciesCount: 1
            },
            {
                subfamily: "Pyrginae",
                subfamilyDescription: "spread-wing skippers",
                subfamilySpeciesCount: 138
            },
            {
                subfamily: "Heteropterinae",
                subfamilyDescription: "skipperlings",
                subfamilySpeciesCount: 7
            },
            {
                subfamily: "Hesperiinae",
                subfamilyDescription: "grass skippers",
                subfamilySpeciesCount: 141
            },
            {
                subfamily: "Megathyminae",
                subfamilyDescription: "giant-skippers",
                subfamilySpeciesCount: 13
            }
        ]
    },
    {
        family: "Pieridae",
        familyDescription: "whites and sulphurs",
        familySpeciesCount: 70,
        subfamilies: [
            {
                subfamily: "Pierinae",
                subfamilyDescription: "whites",
                subfamilySpeciesCount: 29
            },
            {
                subfamily: "Coliadinae",
                subfamilyDescription: "sulphurs",
                subfamilySpeciesCount: 40
            },
            {
                subfamily: "Dismorphiinae",
                subfamilyDescription: "mimic-whites",
                subfamilySpeciesCount: 1
            }
        ]
    },
    {
        family: "Lycaenidae",
        familyDescription: "gossamer-wings",
        familySpeciesCount: 144,
        subfamilies: [
            {
                subfamily: "Miletinae",
                subfamilyDescription: "harvesters",
                subfamilySpeciesCount: 1
            },
            {
                subfamily: "Lycaeninae",
                subfamilyDescription: "coppers",
                subfamilySpeciesCount: 16
            },
            {
                subfamily: "Theclinae",
                subfamilyDescription: "hairstreaks",
                subfamilySpeciesCount: 90
            },
            {
                subfamily: "Polyommatinae",
                subfamilyDescription: "blues",
                subfamilySpeciesCount: 37
            }
        ]
    },
    {
        family: "Riodinidae",
        familyDescription: "metalmarks",
        familySpeciesCount: 28,
        subfamilies: [
        ]
    },
    {
        family: "Nymphalidae",
        familyDescription: "brush-footed butterflies",
        familySpeciesCount: 233,
        subfamilies: [
            {
                subfamily: "Libytheinae",
                subfamilyDescription: "snouts",
                subfamilySpeciesCount: 1
            },
            {
                subfamily: "Heliconiinae",
                subfamilyDescription: "heliconians and fritillaries",
                subfamilySpeciesCount: 40
            },
            {
                subfamily: "Nymphalinae",
                subfamilyDescription: "true brushfoots",
                subfamilySpeciesCount: 76
            },
            {
                subfamily: "Limenitidinae",
                subfamilyDescription: "admirals, sisters and others",
                subfamilySpeciesCount: 37
            },
            {
                subfamily: "Charaxinae",
                subfamilyDescription: "leafwings",
                subfamilySpeciesCount: 8
            },
            {
                subfamily: "Apaturinae",
                subfamilyDescription: "emperors",
                subfamilySpeciesCount: 5
            },
            {
                subfamily: "Morphinae",
                subfamilyDescription: "morphos",
                subfamilySpeciesCount: 3
            },
            {
                subfamily: "Satyrinae",
                subfamilyDescription: "satyrs",
                subfamilySpeciesCount: 49
            },
            {
                subfamily: "Danainae",
                subfamilyDescription: "milkweed butterflies and clearwings",
                subfamilySpeciesCount: 8
            }
        ]
    }
]