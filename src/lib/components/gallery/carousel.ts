export function carouselLeft(elemCarousel: Element): void {
    const x =
        elemCarousel.scrollLeft === 0
            ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop to last
            : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
    elemCarousel.scroll(x, 0);
}

export function carouselRight(elemCarousel: Element): void {
    const x =
        elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
            ? 0 // loop to first
            : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
    elemCarousel.scroll(x, 0);
}

export function carouselThumbnail(elemCarousel: Element, index: number) {


    elemCarousel.scroll(elemCarousel.clientWidth * index, 0);

    /*
     * TODO: use this to remove long range scrolls.
     * Just support smooth on single foward-back moves
     *
     * Ideal would be a smooth transition from current
     * to new while skipping those in between
     * 
    // Change scroll behavior
    elemCarousel.setAttribute("style", "scroll-behavior: auto;");

    // Timeout ensures styles are applied before scrolling
    setTimeout(function () {
        elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
        //window.scrollBy(0, -2000);

        // Reset to CSS defaults.
        //elemCarousel.removeAttribute("style");
        elemCarousel.setAttribute("style", "scroll-behavior: smooth;");

    }, 0)
    
    */

}
