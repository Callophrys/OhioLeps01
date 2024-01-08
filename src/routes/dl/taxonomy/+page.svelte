<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { type Taxonomy } from '@prisma/client';
    export let data;

    function getScientificName(taxon: Taxonomy) {
        if (taxon.taxonType !== 'S' && taxon.taxonType !== 'SS') return taxon.latinName;

        let scientificName = taxon.latinName;
        if (taxon.taxonType === 'S') {
            if (taxon.baseTaxon) scientificName = taxon.baseTaxon.latinName + ' ' + scientificName;
            return scientificName;
        }

        if (taxon.taxonType === 'SS') {
            if (taxon.baseTaxon) {
                scientificName = taxon.baseTaxon?.latinName + ' ' + scientificName;

                if (taxon.baseTaxon.baseTaxon) {
                    scientificName = taxon.baseTaxon.baseTaxon.latinName + ' ' + scientificName;
                }

                return scientificName;
            }

            return scientificName;
        }

        return scientificName;
    }

    function getTaxonIndent(taxonType: string) {
        if (taxonType === 'SF') return 'indent-4';
        if (taxonType === 'G') return 'indent-8';
        if (taxonType === 'S') return 'indent-16';
        if (taxonType === 'SS') return 'indent-20';
        return '';
    }

    import { TreeView, TreeViewItem, RecursiveTreeView } from '@skeletonlabs/skeleton';
    import type { TreeViewNode } from '@skeletonlabs/skeleton';

    let o: any = data.taxonomy.find((x: any) => x.taxonType === 'O');
    const tOrder = {
        id: o.id.toString(),
        content: o.latinName + ' - - - - ' + (o.commonName ?? ''),
        lead: '',
        children: [],
    };

    /*
    console.log(data.taxonomy);

    let hierarchy = ['O', 'F', 'SF', 'G']; //, 'S', 'SS'];

    function getTaxaLevels(level: number, depth: number) {
        console.log('hi');
        if (level >= hierarchy.length) return [];
        const filtered = data.taxonomy.filter(
            (x: any): boolean => x.taxonType === hierarchy[level]
        );
        return filtered.map((y: any) => {
            return {
                id: y.id.toString(),
                content: getScientificName(y) + (y.commonName ? ' - - - - ' + y.commonName : ''),
                lead: '',
                children: getTaxaLevels(1 + level, depth),
            };
        });
    }
    */
    //myTreeViewNodes[0].children = getTaxaLevels(1, 1);

    /*
    let myTreeViewNodes: TreeViewNode[] = [tOrder];
    myTreeViewNodes[0].children = data.taxonomy
        .filter((x: any) => x.taxonType === 'F')
        .map((y: any) => {
            return {
                id: y.id.toString(),
                content: y.latinName + (y.commonName ? ' - - - - ' + y.commonName : ''),
                lead: '',
                children: data.taxonomy
                    .filter((a: any) => a.taxonType === 'SF')
                    .map((b: any) => {
                        return {
                            id: b.id.toString(),
                            content: b.latinName + (b.commonName ? ' - - - - ' + b.commonName : ''),
                            lead: '',
                            children: getTaxaLevel('G', data.taxonomy),
                        };
                    }),
            };
        });
    */

    let myTreeViewNodes: TreeViewNode[] = [tOrder];
    data.taxonomy.forEach((f: any) => {
        if (f.taxonType !== 'F') return true;
        let tmpF: any = {
            id: f.id.toString(),
            content: f.latinName + ' - - - - ' + (f.commonName ?? ''),
            lead: '', // icon
            children: [],
        };
        //console.log(f);
        f.branchTaxa.forEach((sfid: { id: number }) => {
            //console.log('sfid', sfid);
            let sf: any = data.taxonomy.find((x: any) => x.id === sfid.id);
            //console.log(sf);
            if (sf) {
                let tmpSF = {
                    id: sf.id.toString(),
                    content: sf.latinName + (sf.commonName ? ' - - - - ' + sf.commonName : ''),
                    lead: '', // icon
                    children: [],
                };
                tmpF.children.push(tmpSF as never);
                sf.branchTaxa.forEach((gfid: { id: number }) => {
                    let g: any = data.taxonomy.find((x: any) => x.id === gfid.id);
                    let tmpG = {
                        id: g.id.toString(),
                        content: g.latinName + (g.commonName ? ' - - - - ' + g.commonName : ''),
                        lead: '', // icon
                        children: [],
                    };
                    tmpSF.children.push(tmpG as never);
                    g.branchTaxa.forEach((spfid: { id: number }) => {
                        let s: any = data.taxonomy.find((x: any) => x.id === spfid.id);
                        let tmpS = {
                            id: s.id.toString(),
                            content:
                                getScientificName(s) +
                                (s.commonName ? ' - - - - ' + s.commonName : ''),
                            lead: '', // icon
                            children: [],
                        };
                        tmpG.children.push(tmpS as never);
                        s.branchTaxa.forEach((sspfid: { id: number }) => {
                            let ss: any = data.taxonomy.find((x: any) => x.id === sspfid.id);
                            let tmpSS = {
                                id: ss.id.toString(),
                                content:
                                    getScientificName(ss) +
                                    (ss.commonName ? ' - - - - ' + ss.commonName : ''),
                                lead: '', // icon
                                children: [],
                            };
                            tmpS.children.push(tmpSS as never);
                        });
                    });
                });
            }
        });
        tOrder.children.push(tmpF as never);
    });

    let checkedNodes: string[] = [];
    let indeterminateNodes: string[] = [];
</script>

<!-- Taxonomy -->
<StandardContainer>
    <div class="">Butterflies of North America</div>
    <RecursiveTreeView
        selection
        multiple
        relational
        nodes={myTreeViewNodes}
        bind:checkedNodes
        bind:indeterminateNodes
    />
</StandardContainer>
