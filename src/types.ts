export type WindowElementType = typeof window & { adsbygoogle?: unknown }

export type DetectorModalType = {
    theme?: string;
    title?: string;
    message?: string;
    reloadBtnText?: string;
    closeBtn?: boolean;
    onModalClose?: () => void;
}

export type StylesPropsType = {
    theme: string;
    sessionKey: string;
}

export type AdblockDetectionState = {
    detected: boolean;
    loading: boolean;
}
