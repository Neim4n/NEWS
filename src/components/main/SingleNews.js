import React from "react";
//Import icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCalendarAlt, faClock} from "@fortawesome/free-solid-svg-icons";

//Component
function SingleNews({data}) {

    //News data
    const {url, image, title, description, source, publishedAt} = data;

    //Preloader
    let preloader = React.createRef()

    function loadImageHandler(e) {
        preloader.current.classList.add("done");
    }

    return (<a className="news__card" href={url}>
        <div className="card__image">
            <div className="preloader" ref={preloader}>
                <div className="loader"/>
            </div>
            <img className="card-image" onLoad={loadImageHandler}
                 src={image} alt=""/>
            <img className="card-image" src={image} alt=""/>
        </div>
        <span className="card__title">{title}</span>
        <span className="card__description"><span>{description || ""}</span></span>
        <span className="card__footer">
                    <span>{source.name ? <><FontAwesomeIcon icon={faUser}/> {source.name}</> : ""}</span>
                    <span><FontAwesomeIcon icon={faCalendarAlt}/> {publishedAt[0]}</span>
                    <span><FontAwesomeIcon icon={faClock}/> {publishedAt[1]}</span>
        </span>
    </a>)
}

export default React.memo(SingleNews);