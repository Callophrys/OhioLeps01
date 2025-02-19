<script lang="ts">
    import DoubledContainer from '$lib/components/DoubledContainer.svelte';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    /*
    import { imageModules } from '$lib/gallery';
    const galleryUrls: string[] = [];
    for (const path in imageModules) {
      imageModules[path]().then((mod: any) => {
        console.log(path, mod)
        galleryUrls.push(path);
      });
    }
    <ul>
    {#each galleryUrls as asset}
       <li></li>{asset}</li>
    {/each}
    </ul>
    */

    let { data }: { data: any } = $props();
    //console.log('data\n', data.CountySpecimens);
    const notMonitored = '<span class="text-secondary-500">*</span>';

    let isMouseDown = false;

    const sss: { sh: any; svgvp: any; selcnt: any; sellst: any; cspcnt: any; csplst: any } = {
        sh: null,
        svgvp: null,
        selcnt: null,
        sellst: null,
        cspcnt: null,
        csplst: null,
    };

    type countyItem = { id: string; name: string };
    let selectedCounties: countyItem[] = [];

    function calculateCentroid(points: string) {
        const coords = points.split(' ').map((point) => point.split(',').map(Number));
        let area = 0,
            cx = 0,
            cy = 0;

        for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
            const [x0, y0] = coords[j];
            const [x1, y1] = coords[i];
            const cross = x0 * y1 - x1 * y0;
            area += cross;
            cx += (x0 + x1) * cross;
            cy += (y0 + y1) * cross;
        }

        cx /= 3 * area;
        cy /= 3 * area;

        return { cx, cy };
    }

    function handleBlur(e: any) {
        sss.sh.textContent = '';
        sss.sh.classList.replace('opacity-100', 'opacity-0');
    }

    function handleMouseOut(e: any) {
        sss.sh.textContent = '';
        sss.sh.classList.replace('opacity-100', 'opacity-0');
    }

    function handleMouseMove(e: any) {
        if (e.target.tagName === 'polygon') {
            if (isPolygonMonitored(e.target)) {
                sss.sh.textContent = '✔' + e.target.id.substring(e.target.id.lastIndexOf('_') + 1);
            } else {
                sss.sh.textContent = e.target.id.substring(e.target.id.lastIndexOf('_') + 1);
            }
            sss.sh.style.left = e.clientX - Math.ceil(sss.sh.clientWidth / 2) + 'px';
            sss.sh.style.top = e.clientY - 40 + 'px';
            sss.sh.classList.replace('opacity-0', 'opacity-100');

            if (isMouseDown) {
                e.target.classList.add('polygon-select');
                if (selectedCounties.findIndex((c) => c.id === e.target.id) < 0) {
                    selectedCounties.push({
                        id: e.target.id,
                        name: e.target.id.substring(e.target.id.lastIndexOf('_') + 1),
                    });
                    updateCounties();
                }
            }
        } else {
            sss.sh.classList.replace('opacity-100', 'opacity-0');
            sss.sh.textContent = '';
        }
    }

    function handleMouseDown(e: any) {
        isMouseDown = true;
        sss.svgvp.classList.add('cursor-pointer');
        if (e.target.tagName === 'polygon') {
            if (e.shiftKey) {
                let region = Array.from(e.target.classList).find((c: any) => c.startsWith('region'));
                let isAdding = !e.target.classList.contains('polygon-select');
                Array.from(sss.svgvp.querySelectorAll('polygon'))
                    .filter((r: any) => r.classList.contains(region))
                    .forEach((p: any) => {
                        if (isAdding) {
                            if (selectedCounties.findIndex((c) => c.id === p.id) < 0) {
                                p.classList.add('polygon-select');
                                selectedCounties.push({
                                    id: p.id,
                                    name: p.id.substring(p.id.lastIndexOf('_') + 1),
                                });
                            }
                        } else {
                            p.classList.remove('polygon-select');
                            selectedCounties.splice(
                                selectedCounties.findIndex((c: countyItem) => c.id === p.id),
                                1
                            );
                        }
                    });
            } else {
                if (e.target.classList.contains('polygon-select')) {
                    if (!e.ctrlKey) {
                        clearSelectedCounties();
                    } else {
                        e.target.classList.remove('polygon-select');
                        selectedCounties.splice(
                            selectedCounties.findIndex((c: countyItem) => c.id === e.target.id),
                            1
                        );
                    }
                } else {
                    if (!e.ctrlKey) {
                        clearSelectedCounties();
                    }
                    e.target.classList.add('polygon-select');
                    selectedCounties.push({
                        id: e.target.id,
                        name: e.target.id.substring(e.target.id.lastIndexOf('_') + 1),
                    });
                }
            }
            updateCounties();
        }
    }

    function clearSelectedCounties() {
        sss.svgvp.querySelectorAll('polygon').forEach((p: any) => p.classList.remove('polygon-select'));
        selectedCounties.length = 0;
    }

    function handleMouseUp(e: any) {
        isMouseDown = false;
        sss.svgvp.classList.remove('cursor-pointer');
    }

    function isMonitored(county: string) {
        //console.log('v', county);
        let x = data.CountySpecimens.find((d: any) => d.county.toLowerCase() === county);
        //console.log('x', x);
        let y = x?.species.length ?? 0;
        //console.log('y', y);
        return y > 0;
    }

    function isPolygonMonitored(polygon: SVGPolygonElement) {
        return !polygon.classList.contains('not-monitored');
    }

    function updateCounties() {
        sss.selcnt.textContent = 'Selected counties (' + selectedCounties.length + '):';
        sss.sellst.innerHTML =
            '<ul class="list">' +
            selectedCounties
                .map((c: any) => '<li class="capitalize">' + c.name + (isMonitored(c.name) ? '' : notMonitored) + '</li>')
                .sort()
                .join('') +
            '</ul>';

        const ctys = selectedCounties.map((c) => c.name);
        //console.log('CountySpecimens:', data.CountySpecimens);
        //console.log('ctys:', ctys);
        let spcno = data.CountySpecimens.filter((g: any) => {
            //console.log(g.county);
            return ctys.includes(g.county.toString().toLowerCase());
        });
        //console.log('spcno:', spcno);

        let spcnq = spcno.map((h: any) => h.species.map((i: any) => i.commonName));
        let spcnr = [...new Set(spcnq.flat().sort())];
        sss.cspcnt.textContent = `Species in selection (${spcnr.length})`;
        sss.csplst.innerHTML = '<ul class="list">' + spcnr.map((s: any) => '<li class="">' + s + '</li>').join('') + '</ul>';
    }

    $effect(() => {
        sss.sh = document.getElementById('svg_hover');
        sss.svgvp = document.getElementById('svg_oh');
        sss.selcnt = document.getElementById('selected-counties-count');
        sss.sellst = document.getElementById('selected-counties-list');
        sss.cspcnt = document.getElementById('species-in-selection');
        sss.csplst = document.getElementById('species-in-selection-list');

        psvgs.map((c) => {
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.classList.add(c[2]);
            polygon.id = 'svg_' + c[1].substring(2) + '_' + c[3];
            polygon.setAttribute('points', c[4]);
            polygon.classList.add(isMonitored(c[3]) ? 'dot-map' : 'not-monitored');
            sss.svgvp.appendChild(polygon);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const { cx, cy } = calculateCentroid(c[4]);
            circle.setAttribute('cx', cx.toString());
            circle.setAttribute('cy', cy.toString());
            circle.setAttribute('r', '4'); // Adjust radius as needed
            sss.svgvp.appendChild(circle);
        });
    });

    const popupFeatured: PopupSettings = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'popupFeatured',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
    };

    const psvgs = [
        ['usa', 'ohio', 'region1', 'champaign', '56,195 57,182 58,173 74,174 74,176 91,177 95,177 95,187 94,198 56,195'],
        ['usa', 'ohio', 'region1', 'delaware', '118,184 118,175 112,174 112,155 128,155 129,157 136,157 136,163 149,164 149,171 148,185 118,184'],
        ['usa', 'ohio', 'region1', 'fairfield', '152,240 143,239 144,231 143,231 144,217 144,215 146,214 146,206 145,206 145,203 147,203 170,204 170,212 175,213 175,221 178,221 178,229 169,229 169,235 160,235 160,239 152,239 152,240'],
        ['usa', 'ohio', 'region1', 'fayette', '105,258 90,259 90,242 83,241 84,226 114,227 113,245 105,258'],
        ['usa', 'ohio', 'region1', 'franklin', '114,217 113,206 114,205 112,198 113,196 112,193 115,193 116,187 118,187 118,184 148,185 148,200 147,200 147,203 145,203 145,206 146,206 146,214 144,215 144,217 114,217'],
        ['usa', 'ohio', 'region1', 'knox', '149,171 149,164 156,164 156,146 155,146 155,144 157,144 173,143 178,142 186,141 189,141 189,152 189,174 168,173 168,171 149,171'],
        ['usa', 'ohio', 'region1', 'licking', '170,204 147,203 147,200 148,200 148,185 149,171 168,171 168,173 189,174 190,173 190,180 189,201 187,201 187,204 173,204 173,203 170,203 170,204'],
        ['usa', 'ohio', 'region1', 'logan', '91,177 74,176 74,174 58,173 58,153 59,153 59,148 67,148 93,150 93,151 91,177'],
        ['usa', 'ohio', 'region1', 'madison', '84,226 85,220 89,221 94,198 95,187 116,187 115,193 112,193 113,196 112,198 114,205 113,206 114,217 114,227 84,226'],
        ['usa', 'ohio', 'region1', 'marion', '112,155 112,150 100,150 100,148 99,133 108,132 108,131 122,130 140,130 140,135 133,135 133,150 129,151 128,155 112,155'],
        ['usa', 'ohio', 'region1', 'morrow', '149,164 136,163 136,157 129,157 128,155 129,151 133,150 133,135 140,135 140,130 139,129 149,129 156,128 157,133 155,133 155,136 157,136 157,144 155,144 155,146 156,146 156,164 149,164'],
        ['usa', 'ohio', 'region1', 'pickaway', '113,245 114,227 114,217 144,217 143,231 144,231 143,239 152,240 151,249 132,248 133,246 132,245 113,245'],
        ['usa', 'ohio', 'region1', 'union', '95,187 95,177 91,177 93,151 100,150 112,150 112,155 112,174 118,175 118,184 118,187 116,187 95,187'],
        ['usa', 'ohio', 'region2', 'allen', '66,137 50,137 50,136 42,136 42,133 30,133 30,121 34,121 34,117 50,117 50,113 58,112 58,111 66,111 67,121 66,137'],
        ['usa', 'ohio', 'region2', 'crawford', '140,130 122,130 121,103 139,102 141,102 149,102 149,129 139,129 140,130'],
        ['usa', 'ohio', 'region2', 'defiance', '33,63 41,63 41,88 33,88 33,84 25,84 25,79 1,79 1,77 0,63 33,63'],
        ['usa', 'ohio', 'region2', 'erie', '175,73 140,74 139,61 134,60 148,58 160,63 174,59 175,73'],
        ['usa', 'ohio', 'region2', 'fulton', '31,36 65,34 66,56 33,57 33,55 30,54 29,36 31,36'],
        ['usa', 'ohio', 'region2', 'hancock', '93,120 67,121 66,111 66,87 99,87 99,104 96,104 97,108 95,108 95,112 93,112 93,120'],
        ['usa', 'ohio', 'region2', 'hardin', '100,150 93,151 93,150 67,148 66,137 67,121 93,120 94,120 94,131 98,131 98,132 99,133 100,148 100,150'],
        ['usa', 'ohio', 'region2', 'henry', '66,87 41,88 41,63 33,63 33,57 66,56 66,63 66,87'],
        ['usa', 'ohio', 'region2', 'huron', '149,102 141,102 140,77 140,74 175,73 176,94 169,95 169,102 149,102'],
        ['usa', 'ohio', 'region2', 'lucas', '73,34 93,33 116,42 98,43 87,44 84,48 78,52 77,56 70,62 66,63 66,56 65,34 73,34'],
        ['usa', 'ohio', 'region2', 'ottawa', '98,55 98,43 116,42 127,50 142,50 143,53 122,58 104,59 104,55 98,55'],
        ['usa', 'ohio', 'region2', 'paulding', '30,105 1,105 1,79 25,79 25,84 33,84 33,88 34,105 30,105'],
        ['usa', 'ohio', 'region2', 'putnam', '66,111 58,111 58,112 50,113 50,117 34,117 34,112 30,113 30,105 34,105 33,88 41,88 66,87 66,111'],
        ['usa', 'ohio', 'region2', 'richland', '157,144 157,136 155,136 155,133 157,133 156,128 149,129 149,102 169,102 171,101 172,119 173,120 174,127 177,127 178,142 173,143 157,144'],
        ['usa', 'ohio', 'region2', 'sandusky', '98,79 98,55 104,55 104,59 122,58 134,60 139,61 140,74 140,77 98,79'],
        ['usa', 'ohio', 'region2', 'seneca', '121,103 99,104 99,87 98,79 140,77 141,102 139,102 121,103'],
        ['usa', 'ohio', 'region2', 'vanwert', '34,117 34,121 30,121 30,133 26,134 26,130 1,130 1,110 1,105 30,105 30,113 34,112 34,117'],
        ['usa', 'ohio', 'region2', 'williams', '0,63 0,53 0,37 29,36 30,54 33,55 33,57 33,63 0,63'],
        ['usa', 'ohio', 'region2', 'wood', '99,87 66,87 66,63 70,62 77,56 78,52 84,48 87,44 98,43 98,55 98,79 99,87'],
        ['usa', 'ohio', 'region2', 'wyandot', '122,130 108,131 108,132 99,133 98,132 98,131 94,131 94,120 93,120 93,112 95,112 95,108 97,108 96,104 99,104 121,103 122,130'],
        ['usa', 'ohio', 'region3', 'ashland', '186,141 178,142 177,127 174,127 173,120 172,119 171,101 169,102 169,95 176,94 188,94 188,101 191,101 192,131 185,132 186,141'],
        ['usa', 'ohio', 'region3', 'ashtabula', '269,49 268,28 267,15 300,1 301,14 303,48 269,49'],
        ['usa', 'ohio', 'region3', 'carroll', '278,152 254,152 254,139 250,139 250,131 256,131 256,124 258,124 258,124 266,123 279,123 279,131 283,131 283,135 284,139 279,139 279,147 278,147 278,152'],
        ['usa', 'ohio', 'region3', 'columbiana', '283,135 283,131 279,131 279,123 266,123 266,106 279,106 279,103 285,103 285,106 306,105 306,109 307,130 303,132 301,131 299,132 297,135 292,135 292,134 283,135'],
        ['usa', 'ohio', 'region3', 'cuyahoga', '243,65 228,65 228,67 231,72 230,72 222,72 208,73 208,66 201,66 201,51 217,52 235,38 235,44 242,44 243,56 244,56 244,57 243,57 243,65'],
        ['usa', 'ohio', 'region3', 'geauga', '268,28 269,49 269,64 243,65 243,57 244,57 244,56 243,56 242,44 248,43 248,37 262,36 261,29 268,28'],
        ['usa', 'ohio', 'region3', 'harrison', '284,177 267,177 259,177 251,177 251,173 251,165 255,164 254,152 278,152 284,152 284,177'],
        ['usa', 'ohio', 'region3', 'holmes', '189,152 189,141 186,141 185,132 192,131 227,130 227,134 226,134 226,152 223,152 189,152'],
        ['usa', 'ohio', 'region3', 'jefferson', '296,176 284,177 284,152 278,152 278,147 279,147 279,139 284,139 283,135 292,134 292,135 297,135 297,137 299,139 300,143 302,145 301,153 301,154 302,155 303,161 302,164 300,167 298,172 296,175 296,176'],
        ['usa', 'ohio', 'region3', 'lake', '268,28 261,29 262,36 248,37 248,43 242,44 235,44 235,38 242,28 267,15 268,28'],
        ['usa', 'ohio', 'region3', 'lorain', '188,94 176,94 175,73 174,59 197,50 201,51 201,66 208,66 208,73 201,73 202,81 194,81 194,87 188,87 188,94'],
        ['usa', 'ohio', 'region3', 'mahoning', '306,105 285,106 285,103 279,103 279,106 266,106 265,98 271,98 271,84 305,82 306,105'],
        ['usa', 'ohio', 'region3', 'medina', '223,100 191,101 188,101 188,94 188,87 194,87 194,81 202,81 201,73 208,73 222,72 223,100'],
        ['usa', 'ohio', 'region3', 'portage', '265,98 244,99 243,65 269,64 271,84 271,98 265,98'],
        ['usa', 'ohio', 'region3', 'stark', '250,131 241,131 241,130 240,130 239,131 227,134 227,130 226,107 242,107 242,99 244,99 265,98 266,106 266,123 258,124 258,124 256,124 256,131 250,131'],
        ['usa', 'ohio', 'region3', 'summit', '226,107 226,100 223,100 222,72 230,72 231,72 228,67 228,65 243,65 244,99 242,99 242,107 226,107'],
        ['usa', 'ohio', 'region3', 'trumbull', '271,84 269,64 269,49 303,48 303,48 305,82 271,84'],
        ['usa', 'ohio', 'region3', 'tuscarawas', '230,174 230,160 223,160 223,152 226,152 226,134 227,134 239,131 240,130 241,130 241,131 250,131 250,139 254,139 254,152 255,164 251,165 251,173 230,174'],
        ['usa', 'ohio', 'region3', 'wayne', '227,130 192,131 191,101 223,100 226,100 226,107 227,130'],
        ['usa', 'ohio', 'region4', 'athens', '187,272 187,264 184,264 184,255 185,247 193,247 194,238 202,238 201,247 216,247 216,260 218,260 218,262 219,261 219,264 226,264 226,270 224,273 187,272'],
        ['usa', 'ohio', 'region4', 'belmont', '259,206 259,198 259,177 267,177 284,177 296,176 294,188 295,193 293,196 293,199 293,200 291,199 290,200 290,201 291,204 291,205 289,207 259,206'],
        ['usa', 'ohio', 'region4', 'coshocton', '190,180 190,173 189,174 189,152 223,152 223,160 230,160 230,174 227,174 227,180 224,181 190,180'],
        ['usa', 'ohio', 'region4', 'gallia', '200,296 197,301 197,307 193,310 192,313 194,319 194,322 195,327 195,330 192,331 188,330 187,332 182,332 182,323 173,323 173,317 172,317 172,314 165,314 165,308 166,307 174,307 175,289 183,289 183,290 200,291 200,296'],
        ['usa', 'ohio', 'region4', 'guernsey', '259,198 258,198 249,198 249,201 243,201 243,204 235,204 235,210 226,210 226,201 223,201 224,181 227,180 227,174 230,174 251,173 251,177 259,177 259,198'],
        ['usa', 'ohio', 'region4', 'hocking', '184,255 168,255 167,258 159,257 159,258 151,258 151,249 152,240 152,239 160,239 160,235 169,235 169,229 178,229 177,235 186,235 186,238 194,238 193,247 185,247 184,255'],
        ['usa', 'ohio', 'region4', 'jackson', '160,307 151,307 151,298 148,298 149,277 150,277 150,273 158,273 158,275 167,275 167,279 175,279 175,289 174,307 166,307 165,308 160,307'],
        ['usa', 'ohio', 'region4', 'lawrence', '165,349 163,343 159,340 157,337 154,335 149,335 147,334 153,331 151,326 151,324 155,324 156,322 156,317 159,317 160,307 165,308 165,314 172,314 172,317 173,317 173,323 182,323 182,332 187,332 185,343 184,345 180,347 178,347 172,349 168,350 166,349 165,349'],
        ['usa', 'ohio', 'region4', 'meigs', '200,296 200,291 183,290 183,289 184,272 187,272 224,273 225,278 224,281 222,283 220,283 219,284 220,286 223,289 223,293 224,297 223,298 220,295 219,296 217,302 215,303 213,302 212,301 214,297 212,292 211,292 209,292 207,289 204,290 203,292 201,293 200,296'],
        ['usa', 'ohio', 'region4', 'monroe', '257,231 257,233 252,233 252,232 249,232 249,231 247,231 247,230 245,230 245,228 243,228 243,234 235,234 235,226 231,226 230,218 226,218 226,210 235,210 235,204 243,204 243,201 249,201 249,198 258,198 259,198 259,206 253,206 254,222 257,222 257,231'],
        ['usa', 'ohio', 'region4', 'morgan', '216,247 201,247 202,238 203,222 199,222 199,217 226,218 230,218 231,226 235,226 235,234 225,234 224,236 225,239 225,240 226,240 226,244 223,244 222,244 218,243 218,247 216,247'],
        ['usa', 'ohio', 'region4', 'muskingum', '199,217 199,213 192,213 192,205 187,204 187,201 189,201 190,180 224,181 223,201 226,201 226,210 226,218 199,217'],
        ['usa', 'ohio', 'region4', 'noble', '257,231 257,222 254,222 253,206 259,206 289,207 290,210 286,215 287,217 289,219 289,220 287,222 286,224 286,228 284,229 282,230 279,232 275,236 275,237 275,233 260,233 260,234 259,234 259,231 257,231'],
        ['usa', 'ohio', 'region4', 'perry', '194,238 186,238 186,235 177,235 178,229 178,221 175,221 175,213 170,212 170,204 170,203 173,203 173,204 187,204 192,205 192,213 199,213 199,217 199,222 203,222 202,238 194,238'],
        ['usa', 'ohio', 'region4', 'pike', '148,298 119,297 116,293 114,292 111,290 110,289 105,289 107,275 149,277 148,298'],
        ['usa', 'ohio', 'region4', 'ross', '107,275 108,271 107,271 107,270 106,271 105,270 105,268 104,268 105,266 105,258 113,245 132,245 133,246 132,248 151,249 151,258 150,273 150,277 149,277 107,275'],
        ['usa', 'ohio', 'region4', 'scioto', '114,331 114,292 116,293 119,297 148,298 151,298 151,307 160,307 159,317 156,317 156,322 155,324 151,324 151,326 153,331 147,334 145,331 145,326 143,323 143,320 142,318 140,317 136,320 132,321 130,323 126,325 124,330 121,331 116,330 114,331'],
        ['usa', 'ohio', 'region4', 'vinton', '175,289 175,279 167,279 167,275 158,275 158,273 150,273 151,258 159,258 159,257 167,258 168,255 184,255 184,264 187,264 187,272 184,272 183,289 175,289'],
        [
            'usa',
            'ohio',
            'region4',
            'washington',
            '251,256 247,250 246,250 244,250 239,256 238,258 237,264 230,264 229,265 228,269 226,270 226,264 219,264 219,261 218,262 218,260 216,260 216,247 218,247 218,243 222,244 223,244 226,244 226,240 225,240 225,239 224,236 225,234 235,234 243,234 243,228 245,228 245,230 247,230 247,231 249,231 249,232 252,232 252,233 257,233 257,231 259,231 259,234 260,234 260,233 275,233 275,237 271,241 269,243 265,247 264,249 262,250 261,251 258,252 254,255 251,256',
        ],
        ['usa', 'ohio', 'region5', 'adams', '87,329 86,330 84,331 82,329 84,293 88,292 105,289 110,289 111,290 114,292 114,331 113,332 112,332 111,331 110,329 107,327 101,326 97,324 95,323 89,325 88,326 87,329'],
        ['usa', 'ohio', 'region5', 'auglaize', '67,148 59,148 59,153 58,153 34,153 34,163 27,163 27,165 26,164 26,134 30,133 42,133 42,136 50,136 50,137 66,137 67,148'],
        ['usa', 'ohio', 'region5', 'brown', '67,318 63,316 56,317 61,271 70,272 70,293 84,293 82,329 78,328 76,324 72,322 71,319 67,318'],
        ['usa', 'ohio', 'region5', 'butler', '0,266 0,265 0,246 0,241 25,241 25,239 33,239 33,243 35,242 34,267 13,265 11,266 0,266'],
        ['usa', 'ohio', 'region5', 'clark', '85,220 78,219 78,219 72,218 72,216 64,215 63,214 55,213 55,210 56,195 94,198 89,221 85,220'],
        ['usa', 'ohio', 'region5', 'clermont', '44,313 43,307 41,303 39,300 37,294 39,279 40,276 39,275 37,276 37,275 41,270 59,271 61,271 56,317 54,317 47,315 44,313'],
        ['usa', 'ohio', 'region5', 'clinton', '61,271 59,271 61,240 83,241 90,242 90,259 76,270 74,272 73,274 72,273 72,272 70,272 61,271'],
        ['usa', 'ohio', 'region5', 'darke', '24,207 0,207 1,198 1,169 1,166 27,165 28,181 28,207 24,207'],
        ['usa', 'ohio', 'region5', 'greene', '61,240 52,239 53,214 55,214 55,213 63,214 64,215 72,216 72,218 78,219 78,219 85,220 84,226 83,241 61,240'],
        ['usa', 'ohio', 'region5', 'hamilton', '22,286 17,288 14,288 11,287 6,282 2,285 1,285 0,266 11,266 13,265 34,267 40,267 41,270 37,275 37,276 39,275 40,276 39,279 37,294 35,291 31,292 29,291 29,287 27,284 24,285 22,286'],
        ['usa', 'ohio', 'region5', 'highland', '105,289 88,292 84,293 70,293 70,272 72,272 72,273 73,274 74,272 76,270 90,259 105,258 105,266 104,268 105,268 105,270 106,271 107,270 107,271 108,271 107,275 105,289'],
        ['usa', 'ohio', 'region5', 'mercer', '26,134 26,164 27,165 1,166 1,143 1,130 26,130 26,134'],
        ['usa', 'ohio', 'region5', 'miami', '55,210 47,210 47,207 28,207 28,181 40,180 57,182 56,195 55,210'],
        ['usa', 'ohio', 'region5', 'montgomery', '24,207 28,207 47,207 47,210 55,210 55,213 55,214 53,214 52,239 39,238 33,239 25,239 24,207'],
        ['usa', 'ohio', 'region5', 'preble', '25,239 25,241 0,241 0,225 0,207 24,207 25,239'],
        ['usa', 'ohio', 'region5', 'shelby', '57,182 40,180 28,181 27,165 27,163 34,163 34,153 58,153 58,173 57,182'],
        ['usa', 'ohio', 'region5', 'warren', '41,270 40,267 34,267 35,242 33,243 33,239 39,238 52,239 61,240 59,271 41,270'],
    ];
</script>

<DoubledContainer>
    <svelte:fragment slot="leftBody">
        <div class="opacity-0 font-semibold text-white capitalize absolute" id="svg_hover"></div>

        <div class="flex gap-2 justify-between">
            <svg id="svg_oh" viewBox="0 0 308 350" xmlns="http://www.w3.org/2000/svg" height="60vmin" width="60vmin" class="outline-hidden svg-state" onmousedown={handleMouseDown} onmouseup={handleMouseUp} onmousemove={handleMouseMove} onblur={handleBlur} />

            <div class="space-y-2 max-w-44">
                <label class="flex items-center space-x-2">
                    <input class="radio" type="radio" checked name="radio-direct" value="1" />
                    <p>Species present</p>
                </label>
                <label class="flex items-center space-x-2">
                    <input class="radio" type="radio" disabled name="radio-direct" value="2" />
                    <p>Counties with species</p>
                </label>
                <button class="btn variant-filled" use:popup={popupFeatured}>How to select<br />counties</button>
                <div class="card p-4 w-80 shadow-xl bg-surface-100-800-token" data-popup="popupFeatured">
                    <div class="text-center"><p>Instructions</p></div>
                    <ul class="list-disc ml-2">
                        <li>Left-click mouse and drag to create sets of counties</li>
                        <li>Press and hold down control key while clicking or dragging to add or remove</li>
                        <li>Press and hold both control and shift keys to add or remove entire regions of counties</li>
                    </ul>
                    <div class="arrow shadow-xl bg-surface-100-800-token"></div>
                </div>
            </div>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="rightHead">
        <div class="grid grid-cols-2">
            <div>
                <div id="selected-counties-count">Selected counties (0)</div>
            </div>
            <div>
                <div id="species-in-selection">Species in selection (0)</div>
            </div>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="rightBody">
        <div class="grid grid-cols-2">
            <ul id="selected-counties-list" class="list ml-4"></ul>
            <ul id="species-in-selection-list" class="list ml-4"></ul>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="rightTail"><div class="text-xs text-secondary-500 mb-[-1em]">* Not monitored / no species observed</div></svelte:fragment>
</DoubledContainer>
<div class="hidden polygon-select"></div>

<style>
    :root {
        --rc1: #d22b2b;
        --rc2: #ffd700;
        --rc3: #ec5800;
        --rc4: #085119;
        --rc5: #66bd27;

        --cty-sel: #9118b0;
    }

    :global {
        polygon {
            /* cursor: pointer; opt to only do when mouse button is held down and dragging */
            fill: #ff9966;
            stroke: #000;
            stroke-width: 1;
            pointer-events: visible;
            transition: background-color 1000ms linear;

            &:hover {
                fill: #ff6633;
            }
        }

        circle {
            display: none;
        }

        .dot-map circle {
            display: inline;
            fill: #000;
            pointer-events: none;
            z-index: 2;
        }

        .polygon-select {
            fill: var(--cty-sel) !important;

            &.not-monitored {
                fill: color-mix(in srgb, var(--cty-sel) 70%, transparent) !important;
            }
        }

        .region1 {
            fill: var(--rc1);

            &:hover {
                fill: color-mix(in srgb, var(--rc1) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc1) 60%, gray 40%);
            }
        }

        .region2 {
            fill: var(--rc2);

            &:hover {
                fill: color-mix(in srgb, var(--rc2) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc2) 60%, gray 40%);
            }
        }

        .region3 {
            fill: var(--rc3);

            &:hover {
                fill: color-mix(in srgb, var(--rc3) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc3) 60%, gray 40%);
            }
        }

        .region4 {
            fill: var(--rc4);

            &:hover {
                fill: color-mix(in srgb, var(--rc4) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc4) 60%, gray 40%);
            }
        }

        .region5 {
            fill: var(--rc5);

            &:hover {
                fill: color-mix(in srgb, var(--rc5) 70%, transparent);
            }

            &.not-monitored {
                fill: color-mix(in srgb-linear, var(--rc5) 60%, gray 40%);
            }
        }
    }
</style>
