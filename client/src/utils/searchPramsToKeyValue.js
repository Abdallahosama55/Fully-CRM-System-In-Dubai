const searchPramsToKeyValue = (searchPrams) => {
    const queryParams = {};
    for (let [key, value] of searchPrams.entries()) {
        queryParams[key] = value;
    }

    return queryParams;
}

export default searchPramsToKeyValue;