const isValidJson = (str) => {
    try {
        JSON.parse(str?.replaceAll("undefined" , "null"));
        return true;
    } catch (e) {
        return false;
    }
}

export default isValidJson;