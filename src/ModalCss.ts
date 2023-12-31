import { decode_class } from ".";
import { StylesPropsType } from "./types";

export const generateStyles = ({
    theme = "#009688",
    sessionKey
} : StylesPropsType) => {
    return `.${decode_class('modal', sessionKey)} {
        position: fixed;
        z-index: 9999999999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation-name: fadeInDown;
        animation-name: fadeInDown;
    }
    
    @keyframes fadeInDown{
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
        100% {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('content', sessionKey)} {
        background-color: #f5f5f5;
        margin: auto;
        padding: 0;
        border: 0;
        width: 35%;
        border-radius: 5px;
        position: relative;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('closebtn', sessionKey)} {
        background-color: #fff;
        border: 1px solid #b5b5b5;
        top: 3%;
        right: 3%;
        z-index: 99999999;
        background-image: url(https://toolkitspro.com/plugins/adblock/assets/img/close.svg);
        background-repeat: no-repeat;
        background-position: 46% 46%;
        
        border-radius: 50%;
        height: 35px;
        width: 35px;
        padding: 7px;
        position: absolute;
        cursor: pointer;
        outline: none;
        border: 1px solid #ccc;
        box-shadow: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('newtheme_container_content', sessionKey)} * {
        color: #1b1919;
        text-align: center;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('newtheme_container_content', sessionKey)}{
        padding:20px !important;
    }
    
    .${decode_class('modal', sessionKey)} .image-container {
        width: 100px;
        height:100px;
        text-align: center;
        margin: auto;
    }
    
    .${decode_class('modal', sessionKey)} .image-container .image {
        position: relative;
    }
    
    .${decode_class('modal', sessionKey)} .image-container .image i.exclametry_icon {
        position: absolute;
        right: 0;
        top: 8%;
        background: ${theme};
        width: 20px;
        height: 20px;
        border-radius: 100%;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-style: inherit;
        font-weight: bold;
    }
    
    .${decode_class('modal', sessionKey)} .image-container .image h3 {
        font-size: 30px;
        font-weight: 700;
        background: transparent;
        border: 4px dotted ${theme};
        border-radius: 50%;
        text-align: center;
        color: ${theme};
        padding: 27px 0px;
        font-family: inherit;
        margin: 0;
        margin-bottom: 1em;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('footer', sessionKey)} {
        position: relative;
        background: ${theme};
        padding:15px;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('footer', sessionKey)} button{
        background: none;
        border: none;
        box-shadow: none;
        outline: none;
        font-size: 1rem;
        color: #fff;
        cursor:pointer;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('footer', sessionKey)} button svg,
    .${decode_class('modal', sessionKey)} .${decode_class('footer', sessionKey)} button svg path{
        fill:#fff;
    }
    
    .${decode_class('modal', sessionKey)} .${decode_class('footer', sessionKey)} button#howToBlock{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    @media only screen and (max-width:850px){
        body .${decode_class('modal', sessionKey)} .${decode_class('content', sessionKey)} {
            width: 60%;
        }
    }
    
    @media only screen and (max-width:700px){
        body .${decode_class('modal', sessionKey)} .${decode_class('content', sessionKey)} {
            width: 60%;
        }
    }
    
    @media only screen and (max-width:550px){
        body .${decode_class('modal', sessionKey)} .${decode_class('content', sessionKey)} {
            width: 98%;
        }
    }`;
};