let refreshHistory: Element[] = Array.from(document.querySelectorAll(".feed-card"))

window.addEventListener('keyup', function (e) {
    // key refresh
    if (e.code === 'KeyR') {
        (document.querySelector('.roll-btn') as HTMLElement)?.click()
    }

    // key dynamic
    if (e.code === 'KeyD') {
        this.window.open("https://t.bilibili.com/")
    }

    // key rollback
    if (e.code === 'KeyB') {
        rollback()
    }

    if (e.code.startsWith('Digit') || e.code.startsWith('Numpad')) {
        const index = parseInt(e.code.slice(-1)) - 1
        const video = document.querySelectorAll(".feed-card")[index]
        const aElement = video.querySelector("a")
        if (aElement) {
            window.open(aElement.href)
        }
    }
})

const observer = new MutationObserver((mutationsList) => {
    const removedVideo: Element[] = []
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.removedNodes.forEach((node) => {
                if (node instanceof Element && node.matches('.feed-card')) {
                    removedVideo.push(node)
                }
            });
        }
    }
    if (removedVideo.length != 0) {
        refreshHistory = removedVideo
    }
})

const config = {
    childList: true,
    attributes: false,
    subtree: false
};
observer.observe(document.querySelector('.is-version8')!, config)

function removeElements(selector: string) {
    const feedCards = document.querySelectorAll(selector);
    feedCards.forEach((feedCard) => {
        feedCard.parentNode?.removeChild(feedCard);
    });
}

function rollback() {
    const floorElment = document.querySelector('.floor-single-card')
    removeElements('.feed-card')
    refreshHistory.forEach((element: Element) => {
        document.querySelector('.is-version8')!.insertBefore(element, floorElment)
    })
}
