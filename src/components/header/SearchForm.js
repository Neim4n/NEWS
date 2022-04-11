//Imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {inputQuery} from "../../redux/actions";

//Component
function SearchForm({headerNavigation, setIcon, mobileSearchButton, placeholder}) {
    //State
    const [query, setQuery] = useState("");
    //InputHandler - change event
    const inputHandler = (event) => {
        setQuery(event.target.value);
    }
    //newsReducer
    const initialQuery = useSelector(state => {
        return state.newsReducer.query;
    })
    useEffect(() => {
        if (initialQuery !== query) {
            setQuery("");
        }
    }, [initialQuery])

    const dispatch = useDispatch();
    //FormHandler - submit event
    const formHandler = (event) => {
        //Mobile Icon
        setTimeout(() => setIcon(faMagnifyingGlass), 150);
        mobileSearchButton.current.classList.remove("opened");
        //Default Actions
        event.preventDefault();
        headerNavigation.current.classList.remove("open__mobile-search");
        dispatch(inputQuery(query))
    }

    return (
        <form className="search-news__form" onSubmit={formHandler}>
            <input type="text" className="search-news__input" placeholder={placeholder} onChange={inputHandler}
                   value={query}/>
            <button type="submit" className="search-news__button"><FontAwesomeIcon
                icon={faMagnifyingGlass}/>
            </button>
        </form>
    )
}

export default SearchForm;