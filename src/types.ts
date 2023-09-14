export type WindowElementType = typeof window & {adsbygoogle?:string}

export type DetectorModalType = {
    title?: string,
    message?: string,
    hideOnBackdrop?: boolean,
    reloadBtn?: {
        text : string
    },
    closeBtn : boolean,
    onModalClose : () => void
}

export type StylesPropsType = {
    theme : string,
    sessionKey : string
}