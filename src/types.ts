export type WindowElementType = typeof window & {adsbygoogle?:string}

export type DetectorModalType = {
    title?: string,
    message?: string,
    closeable?: boolean,
    hideOnBackdrop?: boolean,
    reloadBtn?: {
        text : string
    }
}

export type StylesPropsType = {
    theme : string
}