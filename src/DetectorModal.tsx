import * as React from 'react'
import { DetectorModalType } from './types'
import { generateStyles } from './ModalCss'
import { decode_class } from '.';

export default function DetectorModal(props: DetectorModalType): JSX.Element {
    
    const reloadPage = (event) => {
        event.preventDefault();
        window.location.reload();
    };

    const styles = generateStyles({
        theme : "#009688"
    });

    return (
        <>
            <style>{styles}</style>

            <div className={decode_class("modal")}>
                <div className={`${decode_class("content")} fadeInDown`}>
                    <div className={decode_class("body")}>
                        <div className={decode_class("theme")}>
                            <div className={decode_class("body")}>
                                {props.closeable && <button className={decode_class("closebtn")} type="button"></button>}

                                <div className={decode_class("newtheme_container_content")}>
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

                                    <div className={decode_class("main_content")}>
                                        <h4 className={decode_class("adblock_title")}>{props.title}</h4>
                                        <div className={decode_class("adblock_subtitle")}>{props.message}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={decode_class("footer")}>
                                {
                                    props?.reloadBtn && (props.reloadBtn.text ? <button className="action-btn-ok adblock_btn" onClick={reloadPage}>{props.reloadBtn.text}</button> : null)
                                }

                                <button className="action-btn-ok howToBlock">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

DetectorModal.defaultProps = {
    title: "Adblock Detected!!!",
    message: "We have detected that you are using extensions to block ads. Please support us by disabling these ads blocker.",
    close: false,
    hideOnBackdrop: false,
    reloadBtn: {
        text: "I've Disable Adblock"
    }
}