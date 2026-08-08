import React, { useCallback, useMemo } from 'react'
import { DetectorModalType } from './types'
import { generateStyles } from './ModalCss'
import { decodeClass } from './classHash'

const noop = () => { };

/**
 * Modal shown when an adblocker is detected. Always renders its markup —
 * mount/unmount it yourself based on detection state (see `useAdblockDetector`).
 * Wrapped in `React.memo`: props are almost always static per-mount, so this
 * skips re-rendering the whole tree (styles string included) when a parent
 * re-renders for unrelated state changes.
 */
function DetectorModal({
    theme = "#ff0000",
    title = "Adblock Detected!!!",
    message = "We have detected that you are using extensions to block ads. Please support us by disabling these ads blocker.",
    reloadBtnText = "I've Disable Adblock",
    closeBtn = false,
    onModalClose = noop,
}: DetectorModalType): JSX.Element {

    const reloadPage = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        window.location.reload();
    }, []);

    const sessionKey = useMemo(() => new Date().toDateString(), []);

    const classes = useMemo(() => ({
        modal: decodeClass('modal', sessionKey),
        content: decodeClass('content', sessionKey),
        body: decodeClass('body', sessionKey),
        theme: decodeClass('theme', sessionKey),
        closebtn: decodeClass('closebtn', sessionKey),
        newtheme_container_content: decodeClass('newtheme_container_content', sessionKey),
        main_content: decodeClass('main_content', sessionKey),
        adblock_title: decodeClass('adblock_title', sessionKey),
        adblock_subtitle: decodeClass('adblock_subtitle', sessionKey),
        footer: decodeClass('footer', sessionKey),
    }), [sessionKey]);

    const styles = useMemo(() => generateStyles({
        theme,
        sessionKey,
    }), [theme, sessionKey]);

    return (
        <>
            <style>{styles}</style>

            <div className={classes.modal}>
                <div className={`${classes.content} fadeInDown`}>
                    <div className={classes.body}>
                        <div className={classes.theme}>
                            <div className={classes.body}>
                                {closeBtn && <button onClick={onModalClose} className={classes.closebtn} type="button"></button>}

                                <div className={classes.newtheme_container_content}>
                                    <div className="wrapper">
                                        <div className="adblock_new_icon">
                                            <div className="image-container">
                                                <div className="image">
                                                    <i className="exclametry_icon">!</i>
                                                    <h3>Ads</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={classes.main_content}>
                                        <h4 className={classes.adblock_title}>{title}</h4>
                                        <div className={classes.adblock_subtitle}>{message}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.footer}>
                                <button className="action-btn-ok adblock_btn" onClick={reloadPage}>{reloadBtnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(DetectorModal);
