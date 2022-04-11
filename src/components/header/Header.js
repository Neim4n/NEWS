//Imports
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {chooseCategory} from "../../redux/actions";
import {useTranslation} from "react-i18next";

//Components
import CountrySelector from "./CountrySelector";
import CategoryMenu from "./CategoryMenu";
import SearchForm from "./SearchForm";
import DisplayLoader from "./DisplayLoader";

//Component
function Header() {
    //Refs
    let categoryMenuRef = React.createRef();
    let openMenuButton = React.createRef();
    let headerNavigation = React.createRef();
    let mobileSearchButton = React.createRef();

    //ToggleMenu - click event
    function toggleMenu(event) {
        openMenuButton.current.classList.toggle("active");
        categoryMenuRef.current.classList.toggle("active");
        mobileSearchButton.current.classList.toggle("non-active");
        mobileSearchButton.current.classList.remove("opened");
        setTimeout(() => setIcon(faMagnifyingGlass), 150);
        headerNavigation.current.classList.remove("open__mobile-search");
        document.body.classList.toggle("lock");
    }

    //Mobile Search Button handler - click event
    const [icon, setIcon] = useState(faMagnifyingGlass);

    function mobileSearchHandler(e) {
        if (!categoryMenuRef.current.classList.contains("active")) {
            mobileSearchButton.current.classList.toggle("opened");
            setTimeout(() => setIcon(icon === faMagnifyingGlass ? faXmark : faMagnifyingGlass), 150);
            headerNavigation.current.classList.toggle("open__mobile-search");
        }
    }

    //Default Button
    let dispatch = useDispatch();

    function defaultButtonHandler() {
        dispatch(chooseCategory("breaking-news"));//general
    }

    //Localisation
    const {t} = useTranslation();

    //Scroll to top
    function scrollUp() {
        window.scroll(0, 0);
    }

    return (
        <header className="header">
            <div className="header__container">
                <nav className="header__navigation" ref={headerNavigation}>
                    <ul className="header__menu">
                        <li className="menu__item title" onClick={scrollUp}>News</li>
                        <li className="menu__item chose-category">
                            <div onClick={toggleMenu} ref={openMenuButton} className="burger-menu"><span/></div>
                        </li>
                        <li className="menu__item load-default hovered"
                            onClick={defaultButtonHandler}>{t("header.load-default")}</li>
                        <li className="menu__item mobile-search-news" onClick={mobileSearchHandler}
                            ref={mobileSearchButton}>
                            <FontAwesomeIcon icon={icon}/>
                        </li>
                        <li className="menu__item search-news">
                            <SearchForm headerNavigation={headerNavigation} setIcon={setIcon}
                                        mobileSearchButton={mobileSearchButton}
                                        placeholder={t("header.input-placeholder")}/>
                        </li>
                        <li className="menu__item change-country">
                            <CountrySelector headerNavigation={headerNavigation}/>
                        </li>
                    </ul>
                    <DisplayLoader/>
                </nav>
                <CategoryMenu categoryMenuRef={categoryMenuRef} toggleMenu={toggleMenu}/>
            </div>
        </header>
    );
}

export default Header;