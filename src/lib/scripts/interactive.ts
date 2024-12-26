const notMonitored = '<span class="text-secondary-500">*</span>';

let data: any;
let isMouseDown = false;

const sss: { sh: any; svgvp: any; selcnt: any; sellst: any; cspcnt: any; csplst: any } = {
    sh: null,
    svgvp: null,
    selcnt: null,
    sellst: null,
    cspcnt: null,
    csplst: null,
};

export function initialize(psvgs: any, data: any, svgId: string) {
    data = data;
    console.log(svgId);

    sss.sh = document.getElementById('svg_hover');
    sss.svgvp = document.getElementById(svgId);
    if (sss.svgvp === null) return;
    sss.svgvp.id = svgId;
    sss.selcnt = document.getElementById('selected-counties-count');
    sss.sellst = document.getElementById('selected-counties-list');
    sss.cspcnt = document.getElementById('species-in-selection');
    sss.csplst = document.getElementById('species-in-selection-list');

    psvgs.map((c: any) => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.classList.add(c.region);
        svgPath.id = `${svgId}_${c.name.replaceAll(' ', '_')}`;
        svgPath.setAttributeNS('http://www.w3.org/2000/svg', 'd', c.d);
        svgPath.classList.add('dot-map');
        sss.svgvp.appendChild(svgPath);

        // const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        // svgPath.classList.add(c.region);
        // svgPath.id = svgId; // `svg_${svgId}_${c.name.replaceAll(' ', '_')}`;
        // const points = removeSubsequentDuplicates(toPairs(c.d.slice(1, -1).trim().split(' ')));
        // const pointsList = points.flatMap(({ x, y }) => [x, y]).join(' ');
        // svgPath.setAttributeNS('http://www.w3.org/2000/svg', 'points', pointsList);
        // svgPath.classList.add(isMonitored(c.name) ? 'dot-map' : 'not-monitored');
        // svgPath.classList.add('dot-map');
        // sss.svgvp.appendChild(svgPath);

        // const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // svgPath.classList.add(c.region);
        // svgPath.id = `svg_${stateId}_${c.name.replaceAll(' ', '_')}`;
        // svgPath.setAttributeNS('http://www.w3.org/2000/svg', 'd', c.d);
        // // svgPath.classList.add(isMonitored(c.name) ? 'dot-map' : 'not-monitored');
        // svgPath.classList.add('dot-map');
        // sss.svgvp.appendChild(svgPath);

        // const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        // const { cx, cy } = getPathCentroid(svgPath);
        // circle.setAttributeNS('http://www.w3.org/2000/svg', 'cx', cx.toString());
        // circle.setAttributeNS('http://www.w3.org/2000/svg', 'cy', cy.toString());
        // circle.setAttributeNS('http://www.w3.org/2000/svg', 'r', '4'); // Adjust radius as needed
        // circle.setAttributeNS('http://www.w3.org/2000/svg', 'transform', 'scale(2)'); // Adjust radius as needed
        // sss.svgvp.appendChild(circle);
        //

    });

    const viewBox = getViewBox(psvgs);
    sss.svgvp.setAttributeNS('http://www.w3.org/2000/svg', 'viewBox', viewBox);

    return sss.svgvp;
}

export function getViewBox(psvgs: any): string {

    let xmin = Infinity;
    let xmax = -Infinity;
    let ymin = Infinity;
    let ymax = -Infinity;

    psvgs.forEach((item: any) => {
        const commands = item.d.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi); // Split by command letters
        if (commands === null) return '0 0 600 800';

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i].trim();
            const type = command.charAt(0);
            if (type !== 'M' && type !== 'L') continue;
            const args = command
                .slice(1)
                .trim()
                .split(/[\s,]+/)
                .map(Number);

            const pairs = toPairs(args);

            pairs.forEach(({ x, y }) => {
                xmin = Math.min(xmin, x);
                xmax = Math.max(xmax, x);

                ymin = Math.min(ymin, y);
                ymax = Math.max(ymax, y);
            });
        }
    });

    if (xmin === Infinity) xmin = 0;
    if (xmax === -Infinity) xmax = 600;
    if (ymin === Infinity) ymin = 0;
    if (ymax === -Infinity) ymax = 800;

    return `${xmin} ${ymin} ${(xmax - xmin).toFixed(2)} ${((ymax - ymin).toFixed(2))}`;
}

type countyItem = { id: string; name: string };
let selectedCounties: countyItem[] = [];

// function removeSubsequentDuplicates(arr: { x: Number, y: Number }[]) {
//     return arr.filter((value, index) => index === 0 || (value.x !== arr[index - 1].x && value.y === arr[index - 1].y));
// }
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

    area /= 2;
    cx /= 6 * area;
    cy /= 6 * area;

    return { cx, cy };
}

function toPairs(arr: any[]) {
    return arr.reduce((pairs: any[], value, index) => {
        if (index % 2 === 0) {
            pairs.push({ x: value, y: arr[index + 1] });
        }
        return pairs;
    }, []);
}

function getPathCentroid(path: any) {

    const pathData = path.getAttributeNS('http://www.w3.org/2000/svg', 'd');
    const commands = pathData.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi); // Split by command letters
    let vertices: any[] = [];
    // let vertices: { x: Number, y: Number }[] = [];
    let cx = 0,
        cy = 0,
        area = 0;

    for (let i = 0; i < commands.length; i++) {
        const command = commands[i].trim();
        const type = command.charAt(0);
        const args = command
            .slice(1)
            .trim()
            .split(/[\s,]+/)
            .map(Number);

        switch (type) {
            case 'M':
            case 'L':
                // vertices = toPairs(args);
                vertices.push({ x: args[0], y: args[1] });
                break;
            case 'Z':
                if (vertices.length > 2) {
                    // Apply the Shoelace formula to calculate the area
                    let n = vertices.length;
                    for (let i = 0; i < n; i++) {
                        let j = (i + 1) % n;
                        cx += (vertices[i].x + vertices[j].x) * (vertices[j].y - vertices[i].y);
                        cy += (vertices[i].y + vertices[j].y) * (vertices[j].x - vertices[i].x);
                        area += vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
                    }
                    area /= 2;
                }
                vertices = []; // Reset vertices for the next subpath
                break;
            // Additional cases for curves (C, Q, etc.) would require sampling points
        }
    }

    console.log('cx:', cx, 'cy:', cy, 'area:', area);

    // Calculate centroid
    cx = cx / (6 * area);
    cy = cy / (6 * area);

    return { cx: cx, cy: cy };
}

export function handleBlur(e: any) {
    sss.sh.textContent = '';
    sss.sh.classList.replace('opacity-100', 'opacity-0');
}

export function handleMouseOut(e: any) {
    sss.sh.textContent = '';
    sss.sh.classList.replace('opacity-100', 'opacity-0');
}

export function handleMouseMove(e: any) {
    if (e.target.tagName === 'path') {
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

export function handleMouseDown(e: any) {
    isMouseDown = true;
    sss.svgvp.classList.add('cursor-pointer');
    if (e.target.tagName === 'path') {
        if (e.shiftKey) {
            let region = Array.from(e.target.classList).find((c: any) => c.startsWith('region'));
            let isAdding = !e.target.classList.contains('polygon-select');
            Array.from(sss.svgvp.querySelectorAll('path'))
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

export function handleMouseUp(e: any) {
    isMouseDown = false;
    sss.svgvp.classList.remove('cursor-pointer');
}

function clearSelectedCounties() {
    sss.svgvp.querySelectorAll('path').forEach((p: any) => p.classList.remove('polygon-select'));
    selectedCounties.length = 0;
}

function isMonitored(county: string) {
    //console.log('v', county);
    let x = data.CountySpecimens.find((d: any) => d.county.toLowerCase() === county);
    //console.log('x', x);
    let y = x?.species.length ?? 0;
    //console.log('y', y);
    return y > 0;
}

function isPolygonMonitored(polygon: SVGPathElement) {
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
