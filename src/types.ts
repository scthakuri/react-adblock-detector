export type WindowElementType = typeof window & {adsbygoogle?:string}

export type DetectorModalType = {
    theme?: string;
    title?: string,
    message?: string,
    reloadBtnText?: string,
    closeBtn?: boolean,
    onModalClose : () => void
}

export type StylesPropsType = {
    theme : string,
    sessionKey : string
}