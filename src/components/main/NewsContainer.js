import React, {memo} from 'react';
//Components
import SingleNews from "./SingleNews";
import Message from "./Message";

const localisation = {
    "ua": "uk",
    "ru": "ru",
    "us": "en"
}

function NewsContainer({data, country}) {
    return (
        <>
            {
                data.articles.length && localisation.hasOwnProperty(country) ? data.articles.map(res => {
                    return <SingleNews data={res} key={res.id}/>
                }) : < Message data={data} wrongLocal={localisation.hasOwnProperty(country)}/>

            }
        </>
    )
}

export default memo(NewsContainer);