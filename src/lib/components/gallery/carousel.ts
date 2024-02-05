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
}
                