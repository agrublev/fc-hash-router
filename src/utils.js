/***
 * Takes in a string and replaces it with
 * @param unescapedString
 * @param flags regex flags g i m
 * @returns {*}
 */
export const escapeRegexString = (unescapedString, flags = "g") => {
    let retString = unescapedString;
    retString = retString.replace(escapeCharsRegex, "\\$&");
    retString = retString.replace(/\//g, "\\/");
    retString = retString.replace(/\(/g, "\\(");
    retString = retString.replace(/\)/g, "\\)");
    retString = retString.replace(/\,/g, "\\,");
    retString = retString.replace(/~1~/g, "(.*?)");
    retString = retString.replace(/~(.*?)\|(.*?)~/g, "(.*?)[$1|$2]");
    // retString = retString.replace(/~1~/g, ".*?");

    retString = retString.replace(/~0~/g, "([\\s\\S]*?)");
    retString = retString.replace("~\\$~", "$");
    retString = retString.replace("~\\^~", "^");
    retString = retString.replace("~AZ~", "(.[a-z|A-Z]*?)");
    flags = retString.endsWith("$") ? "gm" : flags; //im: "g") : dict.flags;
    // console.info(`/${pattern}/${flags}`);

    return new RegExp(retString, flags);
};
