import React, { useRef, useEffect } from 'react'
import { DetectorModalType } from './types'
import { generateStyles } from './ModalCss'
import { decode_class } from '.';
import * as CryptoJS from 'crypto-js';

export default function DetectorModal(props: DetectorModalType): JSX.Element {

    const reloadPage = (event: any) => {
        event.preventDefault();
        window.location.reload();
    };

    const sessionKey = CryptoJS.SHA256((new Date().toDateString())).toString();
    const styles = generateStyles({
        theme: "#009688",
        sessionKey : sessionKey
    });

    return (
        <>
            <style>{styles}</style>

            <div className={decode_class('modal', sessionKey)}>
                <div className={`${decode_class('content', sessionKey)} fadeInDown`}>
                    <div className={decode_class('body', sessionKey)}>
                        <div className={decode_class('theme', sessionKey)}>
                            <div className={decode_class('body', sessionKey)}>
                                {props?.closeBtn && <button onClick={props.onModalClose} className={decode_class('closebtn', sessionKey)} type="button"></button>}

                                <div className={decode_class('newtheme_container_content', sessionKey)}>
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

                                    <div className={decode_class('main_content', sessionKey)}>
                                        <h4 className={decode_class('adblock_title', sessionKey)}>{props.title}</h4>
                                        <div className={decode_class('adblock_subtitle', sessionKey)}>{props.message}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={decode_class('footer', sessionKey)}>
                                {
                                    props?.reloadBtn && (props.reloadBtn.text ? <button className="action-btn-ok adblock_btn" onClick={reloadPage}>{props.reloadBtn.text}</button> : null)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

DetectorModal.defaultProps = {
    show: false,
    title: "Adblock Detected!!!",
    message: "We have detected that you are using extensions to block ads. Please support us by disabling these ads blocker.",
    hideOnBackdrop: false,
    reloadBtn: {
        text: "I've Disable Adblock"
    },
    closeBtn: false,
    onModalClose: () => { }
}