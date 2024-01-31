<script lang="ts">
    import StandardContainer from '$lib/components/StandardContainer.svelte';
    import { assets, base, resolveRoute } from '$app/paths';
</script>

<StandardContainer>
	<svelte:fragment slot="standardBody">
    <div class="">
        <h1>Account</h1>

        <div class="p-4">
            <div>account details</div>
            <div class="pl-4 pt-4">
                <ul>
                    <li>Mortimer Snerd</li>
                    <li>mort@bergenville.com</li>
                    <li>member since: Jan. 1, 2024</li>
                    <li>status: active</li>
                </ul>
            </div>
        </div>
        <div class="p-4">
            <div>change password</div>
            <button type="button" class="btn variant-filled">Update password</button>
        </div>
        <div class="p-4">
            <div>avatar</div>
            <button type="button" class="btn variant-filled">Update avatar</button>
        </div>
        
        <div class="p-4">
            <div>My Images</div>
                <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    <div class="grid gap-4">
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF1997.jpg" alt="Tiger swallowtail" /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF9144.jpg" alt="Elfin" /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF9151.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF9335.jpg" alt=".." /></div>
                    </div>
                    <div class="grid gap-4">
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF0994.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF1819.jpg" alt="Wood nymph" /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF1898.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF1972.jpg" alt=".." /></div>
                    </div>
                    <div class="grid gap-4">
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5887.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5890.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF6506.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF6983.jpg" alt=".." /></div>
                    </div>
                    <div class="grid gap-4">
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5402.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5439.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5465.jpg" alt=".." /></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5552.jpg" alt=".." /></div>
                    </div>
                    <div class="grid gap-4">
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF8126.jpg" alt="Monarch"/></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF2546.jpg" alt="Zebra swallowtail"/></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF5469.jpg" alt="Leopard tiger moth"/></div>
                        <div><img class="h-auto max-w-full rounded-lg" src="{assets}/user/DSCF6727.jpg" alt="Monarch"/></div>
                    </div>
                </section>
            </div>
        </div>
    </svelte:fragment>
</StandardContainer>
