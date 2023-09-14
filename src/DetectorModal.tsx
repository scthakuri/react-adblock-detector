import * as React from 'react'
import { DetectorModalType } from './types'
import { generateStyles } from './ModalCss'

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

            <div className="modal">
                <div className="content fadeInDown" id="content">
                    <div className="body" id="body">
                        <div className="theme theme1">
                            <div className="body">
                                {props.closeable && <button className="closebtn" id="closebtn" type="button"></button>}

                                <div className="newtheme_container_content main_content_wrapper">
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

                                    <div className="main_content">
                                        <h4 className="adblock_title">{props.title}</h4>
                                        <div className="adblock_subtitle">{props.message}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer">
                                {
                                    props?.reloadBtn && (props.reloadBtn.text ? <button className="action-btn-ok adblock_btn" onClick={reloadPage}>{props.reloadBtn.text}</button> : null)
                                }

                                <button id="howToBlock" className="action-btn-ok howToBlock adblock_btn_secondary">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" /></svg>
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