import { Prisma, PrismaClient } from "@prisma/client"
const db = new PrismaClient()

export default async function() {
    console.log('Creating taxonomic records for North America');
    
    let order, family, subfamily, genus, species;
    
    order = await db.taxonomy.create({ data: 
    {
        taxonType: "O",
        latinName: "Lepidoptera",
        commonName: "Butterflies, Moths",
    }});

    let x = {};

    family = await db.taxonomy.create({ data: 
    {
        taxonType: "F",
        latinName: "Papilionidae",
        commonName: "swallowtails and parnassians",
        speciesCount: 40,
        baseTaxonId: order.id
    }});
    x[family.latinName] = { id: family.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Parnassiinae", commonName: "parnassians", speciesCount: 3, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Papilioninae", commonName: "swallowtails", speciesCount: 37, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };

    family = await db.taxonomy.create({ data:
    {
        taxonType: "F",
        latinName: "Hesperiidae",
        commonName: "skippers",
        speciesCount: 300,
        baseTaxonId: order.id
    }});
    x[family.latinName] = { id: family.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Pyrrhopyginae", commonName: "firetips", speciesCount: 1, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Pyrginae", commonName: "spread-wing skippers", speciesCount: 138, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Heteropterinae", commonName: "skipperlings", speciesCount: 7, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Hesperiinae", commonName: "grass skippers", speciesCount: 141, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Megathyminae", commonName: "giant-skippers", speciesCount: 13, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };

    family = await db.taxonomy.create({ data:
    {
        taxonType: "F",
        latinName: "Pieridae",
        commonName: "whites and sulphurs",
        speciesCount: 70,
        baseTaxonId: order.id
    }});
    x[family.latinName] = { id: family.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Pierinae", commonName: "whites", speciesCount: 29, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Coliadinae", commonName: "sulphurs", speciesCount: 40, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Dismorphiinae", commonName: "mimic-whites", speciesCount: 1, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };

    family = await db.taxonomy.create({ data:
    {
        taxonType: "F",
        latinName: "Lycaenidae",
        commonName: "gossamer-wings",
        speciesCount: 144,
        baseTaxonId: order.id
    }});
    x[family.latinName] = { id: family.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Miletinae", commonName: "harvesters", speciesCount: 1, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Feniseca", baseTaxonId: subfamily.id }});
    species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tarquinius", commonName: "Harvester", baseTaxonId: genus.id }});
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Lycaeninae", commonName: "coppers", speciesCount: 16, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Theclinae", commonName: "hairstreaks", speciesCount: 90, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Polyommatinae", commonName: "blues", speciesCount: 37, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };

    family = await db.taxonomy.create({ data:
    {
        taxonType: "F",
        latinName: "Riodinidae",
        commonName: "metalmarks",
        speciesCount: 28,
        baseTaxonId: order.id
    }});
    x[family.latinName] = { id: family.id };

    family = await db.taxonomy.create({ data:
    {
        taxonType: "F",
        latinName: "Nymphalidae",
        commonName: "brush-footed butterflies",
        speciesCount: 233,
        baseTaxonId: order.id
    }});
    x[family.latinName] = { id: family.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Libytheinae", commonName: "snouts", speciesCount: 1, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Heliconiinae", commonName: "heliconians and fritillaries", speciesCount: 40, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Nymphalinae", commonName: "true brushfoots", speciesCount: 76, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Limenitidinae", commonName: "admirals, sisters and others", speciesCount: 37, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Charaxinae", commonName: "leafwings", speciesCount: 8, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Apaturinae", commonName: "emperors", speciesCount: 5, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Morphinae", commonName: "morphos", speciesCount: 3, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Satyrinae", commonName: "satyrs", speciesCount: 49, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };
    subfamily = await db.taxonomy.create({ data: { taxonType: "SF", latinName: "Danainae", commonName: "milkweed butterflies and clearwings", speciesCount: 8, baseTaxonId: family.id }});
    x[family.latinName][subfamily.latinName] =  { id: subfamily.id };

    
   /*
x['Hesperiidae']['Pyrrhopyginae'].id
x['Hesperiidae']['Pyrginae'].id
x['Hesperiidae']['Heteropterinae'].id
x['Hesperiidae']['Hesperiinae'].id
x['Hesperiidae']['Megathyminae'].id
    
x['Lycaenidae']['Miletinae'].id
x['Lycaenidae']['Lycaeninae'].id
x['Lycaenidae']['Theclinae'].id
x['Lycaenidae']['Polyommatinae'].id
    
x['Nymphalidae']['Libytheinae'].id
x['Nymphalidae']['Heliconiinae'].id
x['Nymphalidae']['Nymphalinae'].id
x['Nymphalidae']['Limenitidinae'].id
x['Nymphalidae']['Charaxinae'].id
x['Nymphalidae']['Apaturinae'].id
x['Nymphalidae']['Morphinae'].id
x['Nymphalidae']['Satyrinae'].id
x['Nymphalidae']['Danainae'].id
    
x['Papilionidae']['Parnassiinae'].id
x['Papilionidae']['Papilioninae'].id
x['Pieridae']['Pierinae'].id
x['Pieridae']['Coliadinae'].id
x['Pieridae']['Dismorphiinae'].id
*/
    
    //console.log(x);
}

/*
Subfamily Lycaeninae: coppers
genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "phlaeas", commonName="American copper", baseTaxonId: genus.id }});

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arota", commonName="Tailed copper", baseTaxonId: genus.id }});

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cupreus", commonName="Lustrous copper", baseTaxonId: genus.id }});

subspecies = await db.taxonomy.create({ data: { taxonType: "SS", latinName: "snowi", commonName="Snow's lustrous copper", baseTaxonId: species.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dione", commonName="Gray copper", baseTaxonId: genus.id }});

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dorcas", commonName="Dorcas copper", baseTaxonId: genus.id }});


subspecies = await db.taxonomy.create({ data: { taxonType: "SS", latinName: "claytoni", commonName="Maine dorcas copper", baseTaxonId: species.id }});


subspecies = await db.taxonomy.create({ data: { taxonType: "SS", latinName: "dospassosi", commonName="Salt marsh dorcas copper", baseTaxonId: species.id }});

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "editha", commonName="Edith's copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "epixanthe", commonName="Bog copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gorgon", commonName="Gorgon copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "helloides", commonName="Purplish copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hermes", commonName="Hermes copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "heteronea", commonName="Blue copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hyllus", commonName="Bronze copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mariposa", commonName="Mariposa copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nivalis", commonName="Lilac-bordered copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "phlaeas", commonName="American copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rubidus", commonName="Ruddy copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rubidus ferrisi", commonName="White Mountains copper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lycaena", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "xanthoides", commonName="Great copper", baseTaxonId: genus.id }});


Subfamily Theclinae: hairstreaks
Atala, Eumaeus atala.
Great purple hairstreak, Atlides halesus
Coral hairstreak, Satyrium titus, on butterfly weed
Banded hairstreak, Satyrium calanus
Gray hairstreak, Strymon melinus
Red-banded hairstreak, Calycopis cecrops


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hypaurotia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "crysalus", commonName="Colorado hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Habrodais", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "grunus", commonName="Golden hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Eumaeus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "atala", commonName="Atala", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Eumaeus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "childrenae", commonName="Superb cycadian", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Allosmaitia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "strophius", commonName="Strophius hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atlides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "halesus", commonName="Great purple hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Arawacus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "jada", commonName="Creamy stripe-streak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Rekoa", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "palegon", commonName="Gold-bordered hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Rekoa", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "stagira", commonName="Smudged hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Rekoa", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "marius", commonName="Marius hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ocaria", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ocrisia", commonName="Black hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Chlorostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "maesites", commonName="Amethyst hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Chlorostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "telea", commonName="Telea hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Chlorostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "simaethis", commonName="Silver-banded hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Phaeostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alcestis", commonName="Soapberry hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "titus", commonName="Coral hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "behrii", commonName="Behr's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fuliginosum", commonName="Sooty hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "acadica", commonName="Acadian hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "californica", commonName="California hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sylvinus", commonName="Sylvan hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "edwardsii", commonName="Edward's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "calanus", commonName="Banded hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "caryaevorum", commonName="Hickory hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "kingi", commonName="King's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "liparops", commonName="Striped hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "auretorum", commonName="Gold-hunter's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tetra", commonName="Mountain mahogany hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "saepium", commonName="Hedgerow hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "favonius", commonName="Oak hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "favonius favonius", commonName="Southern oak hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "favonius ontario", commonName="Northern oak hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ilavia", commonName="Ilavia hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Satyrium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "polingi", commonName="Poling's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyanophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "miserabilis", commonName="Clench's greenstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyanophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "goodsoni", commonName="Goodson's greenstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyanophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "amyntor", commonName="Cramer's greenstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyanophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "herodotus", commonName="Tropical greenstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyanophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "longula", commonName="Brown-spotted greenstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dumetorum", commonName="Bramble hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dumetorum dumetorum", commonName="Bramble bramble hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dumetorum viridis", commonName="Coastal bramble hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dumetorum apama", commonName="Canyon bramble hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dumetorum affinis", commonName="Immaculate bramble hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sheridanii", commonName="Sheridan's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sheridanii sheridanii", commonName="White-lined Sheridan's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sheridanii comstocki", commonName="Desert Sheridan's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sheridanii lemberti", commonName="Alpine Sheridan's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "xami", commonName="Xami hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mcfarlandi", commonName="Sandia hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "augustinus", commonName="Brown elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fotis", commonName="Desert elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mossii", commonName="Moss's elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "polios", commonName="Hoary elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "irus", commonName="Frosted elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "henrici", commonName="Henry's elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lanoraieensis", commonName="Bog elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "niphon", commonName="Eastern pine elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "eryphon", commonName="Western pine elfin", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "spinetorum", commonName="Thicket hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "johnsoni", commonName="Johnson's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus", commonName="Juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus gryneus", commonName="Olive juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus sweadneri", commonName="Sweadner's juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus siva", commonName="Siva juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus nelsoni", commonName="Nelson's juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus muiri", commonName="Muir's juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus loki", commonName="Loki's juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gryneus thornei", commonName="Thorne's juniper hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Callophrys", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hesseli", commonName="Hessel's hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Oenomaus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ortygnus", commonName="Aquamarine hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Parrhasius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "polibetes", commonName="Broken-M hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Parrhasius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "m-album", commonName="White M hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Parhassius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "moctezuma", commonName="Mexican-M hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "melinus", commonName="Gray hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "avalona", commonName="Avalon scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rufofusca", commonName="Red-crescent scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bebrycia", commonName="Red-lined scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "martialis", commonName="Martial scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "yojoa", commonName="Yojoa scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "albata", commonName="White scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "acis", commonName="Bartram's scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alea", commonName="Lacey's scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "istapa", commonName="Mallow scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "limenia", commonName="Disguised scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cestri", commonName="Tailless scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bazochii", commonName="Lantana scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "serapio", commonName="Bromeliad scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Strymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "megarus", commonName="Confusing scrub-hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ziegleria", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "guzanta", commonName="Orange-crescent groundstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Electrostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sangala", commonName="Ruddy hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Electrostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "angelia", commonName="Fulvous hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Electrostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "canus", commonName="Muted hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Calycopis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cecrops", commonName="Red-banded hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Calycopis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "isobeon", commonName="Dusky-blue groundstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Calycopis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "origo", commonName="Susanna's groundstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Tmolus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echion", commonName="Red-spotted hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Siderus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tephraeus", commonName="Pearly-gray hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ministrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "leda", commonName="Leda ministreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ministrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "clytie", commonName="Clytie ministreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ministrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "phrutus", commonName="Red-flocked ministreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ministrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "azia", commonName="Gray ministreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ministrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "janevicroy", commonName="Vicroy's ministreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hypostrymon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "critola", commonName="Sonoran hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erora", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "laeta", commonName="Early hairstreak", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erora", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "quaderna", commonName="Arizona hairstreak", baseTaxonId: genus.id }});


Subfamily Polyommatinae: blues
Western pygmy blue, Brephidium exilis
Male eastern tailed blue, Cupido comyntas
Female eastern tailed blue, Cupido comyntas
Acmon blue, Icaricia acmon


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agriades", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cassiope", commonName="Heather blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agriades", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "glandon", commonName="Arctic blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agriades", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "optilete", commonName="Cranberry blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agriades", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "podarce", commonName="Sierra Nevada blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Brephidium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "exilis", commonName="Western pygmy blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Brephidium", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "isophthalma", commonName="Eastern pygmy blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echo", commonName="Echo azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echo bakeri", commonName="Baker's echo azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echo cinerea", commonName="Arizona echo azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echo gozora", commonName="Mexican echo azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echo nigrescens", commonName="Dark echo azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "echo sidara", commonName="Front Range echo azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "humulus", commonName="Hops azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "idella", commonName="Holly azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ladon", commonName="Spring azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lucia", commonName="Northern azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lucia lumarco", commonName="Colorado northern azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neglecta", commonName="Summer azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neglecta argentata", commonName="Manitoba summer azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neglectamajor", commonName="Appalachian azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nigra", commonName="Dusky azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celastrina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "serotina", commonName="Cherry gall azure", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cupido", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "amyntula", commonName="Western tailed-blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cupido", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "comyntas", commonName="Eastern tailed-blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyclargus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ammon", commonName="Nickerbean blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cyclargus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "thomasi", commonName="Miami blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Echinargus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "isola", commonName="Reakirt's blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "battoides", commonName="Square-spotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "battoides allyni", commonName="El Segundo square-spotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "battoides baueri", commonName="Bauer's square-spotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "battoides bernardino", commonName="Bernardino square-spotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "battoides centralis", commonName="Central square-spotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "battoides ellisi", commonName="Ellis's square-spotted blue", baseTaxonId: genus.id }});

        Euphilotes battoides intermedia

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "enoptes", commonName="Dotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "enoptes ancilla", commonName="Ancilla dotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "enoptes dammersi", commonName="Dammer's dotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "enoptes mojave", commonName="Mojave dotted blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rita", commonName="Rita blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rita pallescens", commonName="Pale Rita blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphilotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "spaldingi", commonName="Spalding's blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Glaucopsyche", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lygdamus", commonName="Silvery blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Glaucopsyche", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "piasus", commonName="Arrowhead blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hemiargus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ceraunus", commonName="Ceraunus blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "acmon", commonName="Acmon blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "icarioides", commonName="Boisduval's blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "icarioides missionensis", commonName="Mission Boisduval's blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lupini", commonName="Lupine blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neurona", commonName="Veined blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "saepiolus", commonName="Greenish blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Icaricia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "shasta", commonName="Shasta blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lampides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "boeticus", commonName="Pea blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Leptotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cassius", commonName="Cassius blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Leptotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "marina", commonName="Marine blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Philotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sonorensis", commonName="Sonoran blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Philotiella", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "speciosa", commonName="Small blue", baseTaxonId: genus.id }});

        Philotiella speciosa leona

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Plebejus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "idas", commonName="Northern blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Plebejus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "melissa", commonName="Melissa blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Plebejus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "melissa samuelis", commonName="Karner Melissa blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Plebulina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "emigdionis", commonName="San Emigdio blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Zizula", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cyna", commonName="Cyna blue", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Zizina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "otis", commonName="Lesser grass-blue", baseTaxonId: genus.id }});

    
======================================================================
Subfamily Pyrrhopyginae: firetips


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrrhopyge", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "araxes", commonName="Dull firetip", baseTaxonId: genus.id }});


Subfamily Pyrginae: spread-wing skippers
Silver-spotted skipper, Epargyreus clarus
Long-tailed skipper, Urbanus proteus
Golden banded-skipper, Autochton cellus
Common checkered-skipper, Pyrgus communis


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Phocides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "belus", commonName="Beautiful beamer", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Proteides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mercurius", commonName="Mercurial skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Phocides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pigmalion", commonName="Mangrove skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Phocides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "polybius", commonName="Guava skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Phocides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "urania", commonName="Teal beamer", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Epargyreus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "clarus", commonName="Silver-spotted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Epargyreus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "exadeus", commonName="Broken silverdrop", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Epargyreus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "socus orizaba", commonName="Pepper-spotted silverdrop", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Epargyreus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "spinosa", commonName="Weak-frosted silverdrop", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Epargyreus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "zestos", commonName="Zestos skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polygonus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "leo", commonName="Hammock skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polygonus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "manueli", commonName="Manuel's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Chioides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "catillus", commonName="White-striped longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Chioides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "zilpa", commonName="Zilpa longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Aguna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "asander", commonName="Golden-spotted aguna", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Aguna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "claxon", commonName="Emerald aguna", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Aguna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "metophis", commonName="Tailed aguna", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Typhedanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "undulatus", commonName="Mottled longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polythrix", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mexicana", commonName="Mexican longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polythrix", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "octomaculata", commonName="Eight-spotted longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Zestusa", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dorus", commonName="Short-tailed skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Codatractus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alcaeus", commonName="White-crescent longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Codatractus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arizonensis", commonName="Arizona skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Codatractus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mysie", commonName="Valeriana skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "belli", commonName="Double-striped longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dorantes", commonName="Dorantes longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "doryssus", commonName="White-tailed longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "esmeraldus", commonName="Esmeralda longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "evona", commonName="Turquoise longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "procne", commonName="Brown longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pronus", commonName="Pronus longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "proteus", commonName="Long-tailed skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "simplicius", commonName="Plain longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tanna", commonName="Tanna longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "teleus", commonName="Teleus longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Urbanus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "viterboana", commonName="Cobalt longtail", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Astraptes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alardus", commonName="Frosted flasher", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Astraptes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "anaphus", commonName="Yellow-tipped flasher", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Astraptes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "egregius", commonName="Small-spotted flasher", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Astraptes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fulgerator", commonName="Two-barred flasher", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Astraptes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gilberti", commonName="Gilbert's flasher", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Autochton", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cellus", commonName="Golden banded-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Autochton", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cincta", commonName="Chisos banded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Autochton", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neis", commonName="Spiky banded-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Autochton", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pseudocellus", commonName="Sonoran banded-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Autochton", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "siermadror", commonName="Sierra Madre banded-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achalarus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lyciades", commonName="Hoary edge", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achalarus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "casica", commonName="Desert cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achalarus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tehuanaca", commonName="Dark cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achalarus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "albociliatus", commonName="Skinner's cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achalarus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "toxeus", commonName="Coyote cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achalarus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "jalapus", commonName="Jalapus cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thorybes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bathyllus", commonName="Southern cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thorybes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pylades", commonName="Northern cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thorybes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "diversus", commonName="Western cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thorybes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mexicana", commonName="Mexican cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thorybes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "confusis", commonName="Confused cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thorybes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "drusius", commonName="Drusius cloudywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cabares", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "potrillo", commonName="Potrillo skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Nascus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "phocus", commonName="Common scarlet-eye", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celaenorrhinus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fritzgaertneri", commonName="Fritzgaertner's flat", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celaenorrhinus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "stallingsi", commonName="Stallings's flat", baseTaxonId: genus.id }});

    Falcate skipper, Spathilepia

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cogia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "calchas", commonName="Mimosa skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cogia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hippalus", commonName="Acacia skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cogia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "outis", commonName="Outis skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cogia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "caicus", commonName="Gold-costa skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Arteurotia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tractipennis", commonName="Starred skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polyctor", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "enops", commonName="Brown enops", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Nisoniades", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rubescens", commonName="Purplish-black skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pellicia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arina", commonName="Glazed pellicia", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pellicia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dimidiata", commonName="Morning glory pellicia", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Noctuana", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lactifera bipuncta", commonName="White-haired skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Bolla", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "clytius", commonName="Mottled bolla", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Bolla", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "imbras", commonName="Rounded bolla", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Bolla", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "brennus", commonName="Obscure bolla", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Bolla", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "eusebius", commonName="Mauve bolla", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Staphylus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ceos", commonName="Golden-headed scallopwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Staphylus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mazans", commonName="Mazans scallopwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Staphylus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hayhurstii", commonName="Hayhurst's scallopwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Staphylus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "azteca", commonName="Aztec scallopwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Gorgythion", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "begga", commonName="Variegated skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Sostrata", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bifasciata", commonName="Blue-studded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Mylon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pelopidas", commonName="Dingy mylon", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Carrhenes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "canescens", commonName="Hoary skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Carrhenes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fuscescens", commonName="Black-spotted hoary-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Milanion", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "clito", commonName="Northern clipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Xenophanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tryxus", commonName="Glassy-winged skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Antigonus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "erosus", commonName="Dusted spurwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Antigonus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "emorsus", commonName="White spurwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Noctuana", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "stator", commonName="Red-studded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Systasea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pulverulenta", commonName="Texas powdered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Systasea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "zampa", commonName="Arizona powdered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achylodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "thraso", commonName="Sickle-winged skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Achlyodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pallida", commonName="Pale sicklewing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Grais", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "stigmatica", commonName="Hermit skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Timochares", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ruptifasciatus", commonName="Brown-banded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Anastrus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sempiternus", commonName="Common bluevent", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ebrietas", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "anacreon", commonName="Common bentwing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Chiomara", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "asychis", commonName="White-patched skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Gesta", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "gesta", commonName="False duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "afranius", commonName="Afranius duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "baptisiae", commonName="Wild indigo duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "brizo", commonName="Sleepy duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "brunneus", commonName="Florida duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "funeralis", commonName="Funereal duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "horatius", commonName="Horace's duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "icelus", commonName="Dreamy duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "juvenalis", commonName="Juvenal's duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "juvenalis clitus", commonName="Arizona Juvenal's duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lucilius", commonName="Columbine duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "martialis", commonName="Mottled duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "meridianus", commonName="Meridian duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pacuvius", commonName="Pacuvius duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "persius", commonName="Persius duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "propertius", commonName="Propertius duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "scudderi", commonName="Scudder's duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "telemachus", commonName="Rocky Mountain duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tristis", commonName="Mournful duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erynnis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "zarucco", commonName="Zarucco duskywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "albescens", commonName="White checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "centaureae", commonName="Grizzled skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "centaureae wyandot", commonName="Appalachian grizzled skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "communis", commonName="Common checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "oileus", commonName="Tropical checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "philetas", commonName="Desert checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ruralis", commonName="Two-banded checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "scriptura", commonName="Small checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pyrgus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "xanthus", commonName="Mountain checkered-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Heliopetes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "domicella", commonName="Erichson's white-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Heliopetes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ericetorum", commonName="Northern white-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Heliopetes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "laviana", commonName="Laviana white-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Heliopetes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "macaira", commonName="Turk's-cap white-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Heliopetes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sublinea", commonName="East-Mexican white-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Heliopetes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arsalte", commonName="Veined white-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nessus", commonName="Common streaky-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Celotes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "limpia", commonName="Scarce streaky-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pholisora", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "catullus", commonName="Common sootywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pholisora", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mejicana", commonName="Mexican sootywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "libya", commonName="Mojave sootywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alpheus", commonName="Saltbush sootywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alpheus alpheus", commonName="Saltbush saltbush sootywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alpheus gracielae", commonName="McNeill's saltbush sootywing", baseTaxonId: genus.id }});


Subfamily Heteropterinae: skipperlings
Arctic skipper, Carterocephalus palaemon


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Carterocephalus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "palaemon", commonName="Arctic skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Piruna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pirus", commonName="Russet skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Piruna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "polingi", commonName="Four-spotted skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Piruna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cingo", commonName="Many-spotted skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Piruna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "microstictus", commonName="Small-spotted skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Piruna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "haferniki", commonName="Chisos skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Piruna", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "roeveri", commonName="Two-rayed skipperling", baseTaxonId: genus.id }});


Subfamily Hesperiinae: grass skippers
European skipper, Thymelicus lineola
Dakota skipper, Hesperia dacotae
Zabulon skipper, Poanes zabulon
Lace-winged roadside-skipper, Amblyscirtes aesculapius


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Erionota", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "thrax", commonName="Banana skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Synapte", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "malitiosa", commonName="Malicious skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Synapte", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "salenus", commonName="Salenus skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Synapte", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "syraces", commonName="Faceted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Corticea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "corticea", commonName="Redundant skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Vidius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "perigenes", commonName="Pale-rayed skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Monca", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tyrtaeus", commonName="Violet-patched skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Nastra", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lherminier", commonName="Swarthy skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Nastra", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "julia", commonName="Julia's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Nastra", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neamathla", commonName="Neamathla skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cymaenes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tripunctus", commonName="Three-spotted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Cymaenes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "odilia", commonName="Fawn-spotted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Vehilius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "inca", commonName="Inca brown-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Vehilius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "stictomenes", commonName="Pasture brown-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Remella", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "remus", commonName="Whitened remella", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lerema", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "accius", commonName="Clouded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lerema", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "liris", commonName="Liris skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Vettius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fantasos", commonName="Fantastic skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Perichares", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "philetes", commonName="Green-backed ruby-eye", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Rhinthon", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "osca", commonName="Osca skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Decinea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "percosius", commonName="Double-dotted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Conga", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "chydaea", commonName="Hidden-ray skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ancyloxypha", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "numitor", commonName="Least skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ancyloxypha", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arene", commonName="Tropical least skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Oarisma", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "poweshiek", commonName="Poweshiek skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Oarisma", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "garita", commonName="Garita skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Oarisma", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "edwardsii", commonName="Edwards' skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Copaeodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "aurantiacus", commonName="Orange skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Copaeodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "minimus", commonName="Southern skipperling", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Adopaeoides", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "prittwitzi", commonName="Sunrise skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thymelicus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lineola", commonName="European skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hylephila", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "phyleus", commonName="Fiery skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pseudocopaeodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "eunus", commonName="Alkali skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Stinga", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "morrisoni", commonName="Morrison's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "uncas", commonName="Uncas skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "juba", commonName="Juba skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "comma", commonName="Common branded skipper", baseTaxonId: genus.id }});

        Hesperia comma colorado
        Hesperia comma assiniboia

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "woodgatei", commonName="Apache skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ottoe", commonName="Ottoe skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "leonardus", commonName="Leonard's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pahaska", commonName="Pahaska skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "columbia", commonName="Columbian skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "metea", commonName="Cobweb skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "viridis", commonName="Green skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "attalus", commonName="Dotted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "meskei", commonName="Meske's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dacotae", commonName="Dakota skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lindseyi", commonName="Lindsey's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sassacus", commonName="Indian skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "miriamae", commonName="Sierra skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Hesperia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nevada", commonName="Nevada skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rhesus", commonName="Rhesus skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "carus", commonName="Carus skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "peckius", commonName="Peck's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sabuleti", commonName="Sandhill skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mardon", commonName="Mardon skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "draco", commonName="Draco skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "baracoa", commonName="Baracoa skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "themistocles", commonName="Tawny-edged skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "origenes", commonName="Crossline skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mystic", commonName="Long dash", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sonora", commonName="Sonoran skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Polites", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "vibex", commonName="Whirlabout", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Wallengrenia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "otho", commonName="Southern broken-dash", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Wallengrenia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "egeremet", commonName="Northern broken-dash", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pompeius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pompeius", commonName="Common glassywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Pompeius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "verna", commonName="Little glassywing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atalopedes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "campestris", commonName="Sachem", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytone", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arogos", commonName="Arogos skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Anatrytone", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "logan", commonName="Delaware skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Anatrytone", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mazai", commonName="Glowing skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Problema", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "byssus", commonName="Byssus skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Problema", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bulenta", commonName="Rare skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ochlodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sylvanoides", commonName="Woodland skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ochlodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "agricola", commonName="Rural skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Ochlodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "yuma", commonName="Yuma skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Paratrytone", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "snowi", commonName="Snow's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Paratrytone", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "rhexenor", commonName="Spiked poan", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "massasoit", commonName="Mulberry wing", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hobomok", commonName="Hobomok skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "zabulon", commonName="Zabulon skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "taxiles", commonName="Taxiles skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "aaroni", commonName="Aaron's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "yehl", commonName="Yehl skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "viator", commonName="Broad-winged skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Poanes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "melane", commonName="Umber skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Quasimellana", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "eulogius", commonName="Common mellana", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arpa", commonName="Palmetto skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pilatka", commonName="Palatka skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dion", commonName="Dion skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bayensis", commonName="Bay skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dukesi", commonName="Dukes' skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "conspicua", commonName="Black dash", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "berryi", commonName="Berry's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bimacula", commonName="Two-spotted skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Euphyes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "vestris", commonName="Dun skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Asbolis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "capucinus", commonName="Monk skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hianna", commonName="Dusted skipper", baseTaxonId: genus.id }});

        Atrytonopsis hianna loammi

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "deva", commonName="Deva skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "lunus", commonName="Moon-marked skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "vierecki", commonName="Viereck's skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "pittacus", commonName="White-barred skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "python", commonName="Python skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cestus", commonName="Cestus skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Atrytonopsis", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "edwardsii", commonName="Sheep skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "simius", commonName="Simius roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "exoteria", commonName="Large roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cassus", commonName="Cassus roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "aenus", commonName="Bronze roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "linda", commonName="Linda's roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "oslari", commonName="Oslar's roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hegon", commonName="Pepper and salt skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "elissa", commonName="Elissa roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "texanae", commonName="Texas roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tolteca", commonName="Toltec roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "tolteca prenda", commonName="Prenda Toltec roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "aesculapius", commonName="Lace-winged roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "carolina", commonName="Carolina roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "reversa", commonName="Reversed roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nereus", commonName="Slaty roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nysa", commonName="Nysa roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "eos", commonName="Dotted roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "vialis", commonName="Common roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "celia", commonName="Celia's roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "belli", commonName="Bell's roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alternata", commonName="Dusky roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "phylace", commonName="Orange-headed roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Amblyscirtes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fimbriata", commonName="Orange-edged roadside-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lerodea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "eufala", commonName="Eufala skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lerodea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "arabus", commonName="Violet-clouded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Lerodea", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "dysaules", commonName="Olive-clouded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Oligoria", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "maculata", commonName="Twin-spot skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Calpodes", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ethlius", commonName="Brazilian skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "panoquin", commonName="Salt marsh skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "panoquinoides", commonName="Obscure skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "errans", commonName="Wandering skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ocola", commonName="Ocola skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "hecebola", commonName="Hecebolus skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "sylvicola", commonName="Purple-washed skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Panoquina", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "fusina", commonName="Evans' skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Nyctelius", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "nyctelius", commonName="Violet-banded skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Vacerra", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "bonifilius aeas", commonName="Common therra", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Thespieus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "macareus", commonName="Chestnut-marked skipper", baseTaxonId: genus.id }});


Subfamily Megathyminae: giant-skippers


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "neumoegeni (includes chisosensis)", commonName="Orange giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "aryxna", commonName="Arizona giant-skipper", baseTaxonId: genus.id }});

        Agathymus aryxna baueri
        Agathymus aryxna gentryi

genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "evansi", commonName="Huachuca giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "mariae", commonName="Mary's giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "stephensi", commonName="California giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "remingtoni", commonName="Coahuila giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "polingi", commonName="Poling's giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Agathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "alliae", commonName="Mojave giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Megathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "yuccae (includes coloradensis)", commonName="Yucca giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Megathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "cofaqui (includes harrisi)", commonName="Cofaqui giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Megathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "streckeri", commonName="Strecker's giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Megathymus", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "ursus", commonName="Ursine giant-skipper", baseTaxonId: genus.id }});


genus = await db.taxonomy.create({ data: { taxonType: "G", latinName: "Stallingsia", baseTaxonId: subfamily.Id }});
species = await db.taxonomy.create({ data: { taxonType: "S", latinName: "maculosa", commonName="Manfreda giant-skipper", baseTaxonId: genus.id }});


*/
