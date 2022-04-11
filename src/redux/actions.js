//Imports
import uniqid from "uniqid";
import {
    CHOOSE_COUNTRY,
    CHOOSE_CATEGORY,
    INPUT_QUERY,
    LOAD_NEWS,
    LOAD_DISPLAY_ON,
    LOAD_DISPLAY_OFF, LOAD_CURRENCY_RATES
} from "./types";
import i18next from "i18next";


//Actions
export function chooseCountry(country) {
    return {
        type: CHOOSE_COUNTRY,
        country,
    }
}

export function chooseCategory(category) {
    return {
        type: CHOOSE_CATEGORY,
        category
    }
}

export function inputQuery(query) {
    return {
        type: INPUT_QUERY,
        query
    }
}

export function loaderOn() {
    return {
        type: LOAD_DISPLAY_ON,
    }
}

export function loaderOff() {
    return {
        type: LOAD_DISPLAY_OFF,
    }
}

export function loadNews({country, category, language, query}) {
    window.scrollTo(0, 0);

    //ApiKey
    //const apiKey = "cfa9e2e92f9dc014fc55da2d76dbca61";
    //const apiKey = "2cfb4baaa46a838cf3f143a28918b460";
    //const apiKey = "ec977261d01df12555749832ecff673c";
    //const apiKey = "d32a1e248503eb5cb6309442d6e2cead";
    const apiKey = "9bd8711652e81d95888d8f25ba940780";

    function formatDate(publishedAt) {
        return new Date(publishedAt).toLocaleString(`${language}`, {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).split(",");
    }

    return async dispatch => {
        dispatch(loaderOn());
        let response = [];
        let error = false;
        try {
            if (!query) {
                response = await fetch(`https://gnews.io/api/v4/top-headlines?&token=${apiKey}&country=${country}&lang=${language}&topic=${category}`)
                    .then(res => res.json())
                    .then(res => res.articles.map((news) => {
                        return {...news, id: uniqid(), publishedAt: formatDate(news.publishedAt)}
                    }));
            } else {
                response = await fetch(`https://gnews.io/api/v4/search?q=${query}&token=${apiKey}&lang=${language}`)
                    .then(res => res.json())
                    .then(res => res.articles.map((news) => {
                        return {...news, id: uniqid(), publishedAt: formatDate(news.publishedAt)}
                    }));
            }
            if (response.hasOwnProperty("errors")) {
                throw new Error(response.errors);
            }
        } catch (err) {
            console.log(err);
            error = true;
        }
        await i18next.changeLanguage(language)
        dispatch({
            type: LOAD_NEWS,
            articles: response,
            responseError: error,
            language
        });
        dispatch(loaderOff());
    }
}

export function loadCurrencyRates() {
    const responseOptions = {
        base: "eur",
        currencies: {
            "UAH": "UA",
            "USD": "US",
            "EUR": "EU",
            "GBP": "GB",
            "JPY": "JP",
            "CHF": "CH",
            "CNY": "CN",
            "RUB": "RU",
            "AED": "AE",
            "AFN": "AF",
            "ALL": "AL",
            "AMD": "AM",
            "AOA": "AO",
            "ARS": "AR",
            "AUD": "AU",
            "AZN": "AZ",
            "BDT": "BD",
            "BGN": "BG",
            "BHD": "BH",
            "BIF": "BI",
            "BND": "BN",
            "BOB": "BO",
            "BRL": "BR",
            "BWP": "BW",
            "BYN": "BY",
            "CAD": "CA",
            "CDF": "CD",
            "CLP": "CL",
            "COP": "CO",
            "CRC": "CR",
            "CUP": "CU",
            "CZK": "CZ",
            "DJF": "DJ",
            "DKK": "DK",
            "DZD": "DZ",
            "EGP": "EG",
            "ETB": "ET",
            "GEL": "GE",
            "GHS": "GH",
            "GMD": "GM",
            "GNF": "GN",
            "HKD": "HK",
            "HRK": "HR",
            "HUF": "HU",
            "IDR": "ID",
            "ILS": "IL",
            "INR": "IN",
            "IQD": "IQ",
            "IRR": "IR",
            "ISK": "IS",
            "JOD": "JO",
            "KES": "KE",
            "KGS": "KG",
            "KHR": "KH",
            "KPW": "KP",
            "KRW": "KR",
            "KWD": "KW",
            "KZT": "KZ",
            "LAK": "LA",
            "LBP": "LB",
            "LKR": "LK",
            "LYD": "LY",
            "MAD": "MA",
            "MDL": "MD",
            "MGA": "MG",
            "MKD": "MK",
            "MNT": "MN",
            "MRO": "MR",
            "MUR": "MU",
            "MVR": "MV",
            "MWK": "MW",
            "MXN": "MX",
            "MYR": "MY",
            "MZN": "MZ",
            "NAD": "NA",
            "NGN": "NG",
            "NIO": "NI",
            "NOK": "NO",
            "NPR": "NP",
            "NZD": "NZ",
            "OMR": "OM",
            "PEN": "PE",
            "PHP": "PH",
            "PKR": "PK",
            "PLN": "PL",
            "PYG": "PY",
            "QAR": "QA",
            "RON": "RO",
            "RSD": "RS",
            "SAR": "SA",
            "SCR": "SC",
            "SDG": "SD",
            "SEK": "SE",
            "SGD": "SG",
            "SLL": "SL",
            "SOS": "SO",
            "SRD": "SR",
            "SYP": "SY",
            "SZL": "SZ",
            "THB": "TH",
            "TJS": "TJ",
            "TMT": "TM",
            "TND": "TN",
            "TRY": "TR",
            "TWD": "TW",
            "TZS": "TZ",
            "UGX": "UG",
            "UYU": "UY",
            "UZS": "UZ",
            "VEF": "VE",
            "VND": "VN",
            "XAF": "CM",
            "XOF": "SN",
            "YER": "YE",
            "ZAR": "ZA",
            "ZMK": "ZM",
            "ATS": "AT",
            "AZM": "AZ",
            "BEF": "BE",
            "BGL": "BG",
            "BYB": "BY",
            "BYR": "BY",
            "CSD": "CS",
            "CYP": "CY",
            "DEM": "DE",
            "ECS": "EC",
            "EEK": "EE",
            "ESP": "ES",
            "FIM": "FI",
            "FRF": "FR",
            "GHC": "GH",
            "GRD": "GR",
            "HRD": "HR",
            "IEP": "IE",
            "ITL": "IT",
            "LTL": "LT",
            "LVL": "LV",
            "MTL": "MT",
            "NLG": "NL",
            "PLZ": "PL",
            "PTE": "PT",
            "ROL": "RO",
            "RUR": "RU",
            "SDD": "SD",
            "SIT": "SI",
            "SKK": "SK",
            "TMM": "TM",
            "TRL": "TR",
            "VEB": "VE",
            "XEU": "XE",
            "XPT": "XP",
            "XPD": "XP"
        }
    }

    function formatResponse(response) {
        let result = [];
        let currencyArray = Object.entries(response.latest).filter(currency => Object.keys(responseOptions["currencies"]).some(elem => elem.toLowerCase() === currency[0]));

        currencyArray.forEach(item => {
            result.push({
                label: item[0].toUpperCase(),
                value: item[1],
                previousValue: response.previous[item[0]],
                flag: responseOptions.currencies[item[0].toUpperCase()]
            })
        })

        return result;
    }

    return async dispatch => {
        let response = {};
        let date;
        try {
            response.latest = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${responseOptions.base}.json`)
                .then(res => res.json())
                .then(res => {
                    date = new Date(new Date(res.date) - 1).toISOString().split('T')[0];
                    return res[responseOptions.base];
                });
            response.previous = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${responseOptions.base}.json`)
                .then(res => res.json())
                .then(res => res[responseOptions.base]);
        } catch (err) {
            console.log(err);
        }
        response = formatResponse(response)
        dispatch({
            type: LOAD_CURRENCY_RATES,
            base: responseOptions.base,
            currencies: response,
        });
    }
}


