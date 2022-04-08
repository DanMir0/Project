export function createIFrame(parent, src) {
    const el = window.document.createElement("iframe")
    el.setAttribute("src", src)
    el.setAttribute("style", "visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;")
    //el.setAttribute("style", "position:fixed;z-index:9999;top:0;background-color:#fff")
    el.setAttribute("width", "500px")
    el.setAttribute("height", "500px")
    el.setAttribute("wmode", "opaque")
    parent.appendChild(el)

    //fix webpack dev server HMR
    el.contentWindow.require = window.require

    return el
}


const DEFAULT_OPTIONS = {
    parent: window.document.body,
    headElements: [],
    bodyElements: [],
    src: "/print.html"
}

/** Printd class that prints HTML elements in a blank document */
export default class Printd {
    opts = {}
    iframe
    isLoading = false
    hasEvents = false
    callback
    elCopy

    constructor(options) {
        // IE 11+ "Object.assign" polyfill
        this.opts = [DEFAULT_OPTIONS, options || {}].reduce((a, b) => {
            Object.keys(b).forEach((k) => (a[k] = b[k]))
            return a
        }, {})

        this.iframe = createIFrame(this.opts.parent, this.opts.src)
    }

    /** Gets current Iframe reference */
    getIFrame() {
        return this.iframe
    }

    /**
     * Print an HTMLElement
     *
     * @param el HTMLElement
     * @param callback Optional callback that will be triggered when content is ready to print
     */
    print(el, callback) {
        if (this.isLoading) return

        const {contentDocument, contentWindow} = this.iframe

        if (!contentDocument || !contentWindow) return

        this.elCopy = el.cloneNode(true)

        if (!this.elCopy) return

        this.isLoading = true
        this.callback = callback
        this.addEvents()
    }


    launchPrint(contentWindow) {
        if (!this.isLoading) {
            contentWindow.print()
        }
    }

    addEvents() {
        if (!this.hasEvents) {
            this.hasEvents = true
            this.iframe.addEventListener("load", () => this.onLoad(), false)
        }
    }

    onLoad() {
        if (this.iframe) {
            this.isLoading = false

            const {contentDocument, contentWindow} = this.iframe

            if (!contentDocument || !contentWindow) return

            contentWindow.document.body.appendChild(this.elCopy)
            contentWindow.document.close()

            if (typeof this.callback === "function") {
                this.callback({
                    iframe: this.iframe,
                    element: this.elCopy,
                    launchPrint: () => this.launchPrint(contentWindow)
                })
            } else {
                this.launchPrint(contentWindow)
            }
        }
    }

    destroy() {
        this.iframe.remove()
    }
}

export {Printd}