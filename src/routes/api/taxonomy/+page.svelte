<script lang="ts">
    import Container from '$lib/components/layouts/Container.svelte';
    /*
    import type { TaxonomyComplete } from '$lib/types';
    import type { TreeViewNode } from '@skeletonlabs/skeleton';
    import { TreeView, TreeViewItem, RecursiveTreeView } from '@skeletonlabs/skeleton';

    let { data } = $props();

    function getScientificName(taxon: TaxonomyComplete) {
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

    let o: any = data.taxonomy.find((x: any) => x.taxonType === 'O');
    const tOrder = {
        id: o.id.toString(),
        content: o.latinName + ' - - - - ' + (o.commonName ?? ''),
        lead: '',
        children: [],
    };

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
                            content: getScientificName(s) + (s.commonName ? ' - - - - ' + s.commonName : ''),
                            lead: '', // icon
                            children: [],
                        };
                        tmpG.children.push(tmpS as never);
                        s.branchTaxa.forEach((sspfid: { id: number }) => {
                            let ss: any = data.taxonomy.find((x: any) => x.id === sspfid.id);
                            let tmpSS = {
                                id: ss.id.toString(),
                                content: getScientificName(ss) + (ss.commonName ? ' - - - - ' + ss.commonName : ''),
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

    function getBranch(t: any) {
        return data.taxonomy.filter((b: any) => b.baseTaxonId === t.id);
    }

    let myTreeView: TreeView;
    $effect(() => myTreeView.expandAll());

        <TreeViewItem>
            {getScientificName(o) + ' - - - - ' + o.commonName}
            <svelte:fragment slot="children">
                {#each getBranch(o) as f}
                    <TreeViewItem>
                        {getScientificName(f) + ' - - - - ' + f.commonName}
                        <svelte:fragment slot="children">
                            {#each getBranch(f) as sf}
                                <TreeViewItem>
                                    {getScientificName(sf) + ' - - - - ' + sf.commonName}
                                    <svelte:fragment slot="children"
                                        >{#each getBranch(sf) as g}
                                            <TreeViewItem>
                                                {getScientificName(g)}
                                                <svelte:fragment slot="children">
                                                    {#each getBranch(g) as s}
                                                        <TreeViewItem>
                                                            {getScientificName(s)}
                                                            <svelte:fragment slot="children">
                                                                {#each getBranch(s) as ss}
                                                                    <TreeViewItem>
                                                                        {getScientificName(ss)}
                                                                    </TreeViewItem>
                                                                {/each}
                                                            </svelte:fragment>
                                                        </TreeViewItem>
                                                    {/each}
                                                </svelte:fragment>
                                            </TreeViewItem>
                                        {/each}</svelte:fragment>
                                </TreeViewItem>
                            {/each}
                        </svelte:fragment>
                    </TreeViewItem>
                {/each}
            </svelte:fragment>
        </TreeViewItem>
    </TreeView>

{#snippet body()}
    <TreeView bind:this={myTreeView}>
    <RecursiveTreeView selection multiple relational nodes={myTreeViewNodes} bind:checkedNodes bind:indeterminateNodes />
{/snippet}
    */
</script>

{#snippet head()}
    <div class="">Butterflies of North America</div>
{/snippet}

{#snippet body()}
    <p>Requires either a revert back to full Svelte 4 or see if Skeleton 3 has these and upgrade Skeleton</p>
{/snippet}

<Container {head} {body} tail={null} />
