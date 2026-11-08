const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const katapayadi = {
    ka: "1",
    kha: "2",
    ga: "3",
    gha: "4",
    nga: "5",

    ca: "6",
    cha: "7",
    ja: "8",
    jha: "9",
    nya: "0",

    ta: "1",
    tha: "2",
    da: "3",
    dha: "4",
    na: "5",

    pa: "1",
    pha: "2",
    ba: "3",
    bha: "4",
    ma: "5",

    ya: "1",
    ra: "2",
    la: "3",
    va: "4",

    sha: "5",
    ssa: "6",
    sa: "7",
    ha: "8"
};
// ========================================
// BHUTA SANKHYA MAPPING
// ========================================

const bhutaMap = {

    sun: "0",
    moon: "1",

    eyes: "2",
    ears: "2",

    directions: "4",
    vedas: "4",

    elements: "5",
    senses: "5",

    seasons: "6",
    rasas: "6",

    planets: "9",

    fingers: "10"

};
// ========================================
// BHUTA SANKHYA ENCODE
// ========================================

function bhutaEncode(text) {

    const words = text
        .toLowerCase()
        .trim()
        .split(/\s+/);

    let result = [];

    for (let word of words) {

        if (bhutaMap[word]) {

            result.push(bhutaMap[word]);

        } else {

            result.push("?");

        }

    }

    return result.join(" ");
}
// ========================================
// BHUTA SANKHYA DECODE
// ========================================

const bhutaReverse = {

    "0": "sun",

    "1": "moon",

    "2": "eyes",

    "4": "vedas",

    "5": "elements",

    "6": "seasons",

    "9": "planets",

    "10": "fingers"

};


function bhutaDecode(text) {

    const numbers = text
        .trim()
        .split(/\s+/);

    let result = [];

    for (let number of numbers) {

        if (bhutaReverse[number]) {

            result.push(
                bhutaReverse[number]
            );

        } else {

            result.push("?");

        }

    }

    return result.join(" ");
}

// ========================================
// CUSTOM ENCODE
// ========================================

function customEncode(text) {

    const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const key = "BHARAT";


    const uniqueKey =
        [...new Set(
            key + alphabet
        )].join("");


    let result = "";


    for (let char of text) {

        const upper =
            char.toUpperCase();

        const index =
            alphabet.indexOf(upper);


        if (index !== -1) {

            result +=
                uniqueKey[index];

        } else {

            result += char;

        }

    }


    return result;
}

// ========================================
// CUSTOM DECODE
// ========================================

function customDecode(text) {

    const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const key = "BHARAT";


    const uniqueKey =
        [...new Set(
            key + alphabet
        )].join("");


    let result = "";


    for (let char of text) {

        const index =
            uniqueKey.indexOf(
                char.toUpperCase()
            );


        if (index !== -1) {

            result +=
                alphabet[index];

        } else {

            result += char;

        }

    }


    return result;
}
function katapayadiEncode(text) {

    text = text.toLowerCase();

    let result = "";

    for (let char of text) {

        if (char === "k") {
            result += "1";
        }

        else if (char === "g") {
            result += "3";
        }

        else if (char === "c") {
            result += "6";
        }

        else if (char === "j") {
            result += "8";
        }

        else if (char === "t") {
            result += "1";
        }

        else if (char === "d") {
            result += "3";
        }

        else if (char === "n") {
            result += "5";
        }

        else if (char === "p") {
            result += "1";
        }

        else if (char === "b") {
            result += "3";
        }

        else if (char === "m") {
            result += "5";
        }

        else if (char === "r") {
            result += "2";
        }

        else if (char === "l") {
            result += "3";
        }

        else if (char === "v") {
            result += "4";
        }

        else if (char === "s") {
            result += "7";
        }

        else if (char === "h") {
            result += "8";
        }
    }

    return result;
}
app.post("/api/encode", (req, res) => {

    const text = req.body.text;

    const method = req.body.method;

    let result;


    if (method === "katapayadi") {

        result =
            katapayadiEncode(text);

    }


    else if (method === "bhuta") {

        result =
            bhutaEncode(text);

    }


    else if (method === "custom") {

        result =
            customEncode(text);

    }


    else {

        result =
            "Invalid technique";

    }


    res.json({

        result: result

    });

});
app.post("/api/decode", (req, res) => {

    const text = req.body.text;

    const method = req.body.method;

    let result;


    if (method === "katapayadi") {

        result =
            katapayadiDecode(text);

    }


    else if (method === "bhuta") {

        result =
            bhutaDecode(text);

    }


    else if (method === "custom") {

        result =
            customDecode(text);

    }


    else {

        result =
            "Invalid technique";

    }


    res.json({

        result: result

    });

});

// ================================
// DECODE FUNCTION
// ================================

function katapayadiDecode(text) {

    const reverseMap = {

        "1": "ka",
        "2": "kha",
        "3": "ga",
        "4": "gha",
        "5": "na",
        "6": "ca",
        "7": "cha",
        "8": "ja",
        "9": "jha",
        "0": "nya"

    };


    let result = "";


    for (let char of text) {

        if (reverseMap[char]) {

            result +=
                reverseMap[char] + " ";

        }

        else {

            result += char;

        }

    }


    return result.trim();

}


// ================================
// DECODE API
// ================================

app.post("/api/decode", (req, res) => {

    const text = req.body.text;

    const result =
        katapayadiDecode(text);

    res.json({

        result: result

    });

});
app.listen(PORT, () => {

    console.log(
        `BharatCode running at http://localhost:${PORT}`
    );

});