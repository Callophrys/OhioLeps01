import { error } from '@sveltejs/kit';

import GA1819 from '$lib/assets/gallery/butterflies/DSCF1819.jpg';
import GA1858 from '$lib/assets/gallery/butterflies/DSCF1858.jpg';
import GA1898 from '$lib/assets/gallery/butterflies/DSCF1898.jpg';
import GA1972 from '$lib/assets/gallery/butterflies/DSCF1972.jpg';
import GA1997 from '$lib/assets/gallery/butterflies/DSCF1997.jpg';
import GA2546 from '$lib/assets/gallery/butterflies/DSCF2546.jpg';
import GA5084 from '$lib/assets/gallery/butterflies/DSCF5084.jpg';
import GA8126 from '$lib/assets/gallery/butterflies/DSCF8126.jpg';
import GA9144 from '$lib/assets/gallery/butterflies/DSCF9144.jpg';
import GA9335 from '$lib/assets/gallery/butterflies/DSCF9335.jpg';

import GA0994 from '$lib/assets/gallery/moths/DSCF0994.jpg';
import GA2164 from '$lib/assets/gallery/moths/DSCF2164.jpg';
import GA5323 from '$lib/assets/gallery/moths/DSCF5323.jpg';
import GA5402 from '$lib/assets/gallery/moths/DSCF5402.jpg';
import GA5439 from '$lib/assets/gallery/moths/DSCF5439.jpg';
import GA5443 from '$lib/assets/gallery/moths/DSCF5443.jpg';
import GA5465 from '$lib/assets/gallery/moths/DSCF5465.jpg';
import GA5469 from '$lib/assets/gallery/moths/DSCF5469.jpg';
import GA5472 from '$lib/assets/gallery/moths/DSCF5472.jpg';
import GA5473 from '$lib/assets/gallery/moths/DSCF5473.jpg';
import GA5521 from '$lib/assets/gallery/moths/DSCF5521.jpg';
import GA5527 from '$lib/assets/gallery/moths/DSCF5527.jpg';
import GA5552 from '$lib/assets/gallery/moths/DSCF5552.jpg';
import GA5887 from '$lib/assets/gallery/moths/DSCF5887.jpg';
import GA5890 from '$lib/assets/gallery/moths/DSCF5890.jpg';
import GA6506 from '$lib/assets/gallery/moths/DSCF6506.jpg';
import GA6727 from '$lib/assets/gallery/moths/DSCF6727.jpg';
import GA6983 from '$lib/assets/gallery/moths/DSCF6983.jpg';
import GA9151 from '$lib/assets/gallery/moths/DSCF9151.jpg';

import GA0206 from '$lib/assets/gallery/other/DSCF0206.jpg';
import GA0222 from '$lib/assets/gallery/other/DSCF0222.jpg';
import GA0189 from '$lib/assets/gallery/other/DSCF0189.jpg';

/** @type {import('./$types').PageLoad} */
export function load({ params } : any) {
    const unsplashIds: string[] = [];

    switch (String(params.category)) {
        case 'butterflies':
            unsplashIds.push(GA1819, GA1858, GA1898, GA1972, GA1997, GA2546, GA5084, GA8126, GA9144, GA9335);
            break;
        case 'moths':
            unsplashIds.push(GA0994, GA5402, GA5439, GA5465, GA5469, GA5552, GA5887, GA5890, GA6506, GA6727, GA6983, GA2164, GA5323, GA5443, GA5472, GA5473, GA5521, GA5527, GA9151);
            break;
        case 'other':
            unsplashIds.push(GA0206, GA0222, GA0189);
            break;
        case 'user':
            break;
        case '*':
            unsplashIds.push(GA0994, GA1819, GA1898, GA1972, GA1997, GA2546, GA5402, GA5439, GA5465, GA5469, GA5552, GA5887, GA5890, GA6506, GA6727, GA6983, GA8126, GA9144, GA9151, GA9335, GA1858, GA2164, GA5084, GA5323, GA5443, GA5472, GA5473, GA5521, GA5527);
            break;
        default:
            return error(404, 'Not found');
    }

    return { unsplashIds: unsplashIds }
}
