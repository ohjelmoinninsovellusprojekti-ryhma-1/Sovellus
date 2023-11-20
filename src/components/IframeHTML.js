import React from "react";
import '../styles/home.css';

const IframeHTML = () => {
    const iframeSrc = "/home.html";
    return (
        <iframe src = {iframeSrc} title = "HTML" width="100%"  height="500p" />
    );
}

export default IframeHTML;