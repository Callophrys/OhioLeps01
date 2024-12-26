import jalisco from '$lib/assets/svgs/north_america/mexico/jalisco.svg';

export function load({ params }: any) {
    const loadableSvgs: any = {};
    loadableSvgs['jalisco'] = jalisco;

    return { loadableSvgs: loadableSvgs }
}
