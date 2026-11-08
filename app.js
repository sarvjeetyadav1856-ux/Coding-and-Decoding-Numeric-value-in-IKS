// ================================
// GET HTML ELEMENTS
// ================================

const method = document.getElementById("method");

const inputText = document.getElementById("inputText");

const result = document.getElementById("result");

const encodeBtn = document.getElementById("encodeBtn");

const decodeBtn = document.getElementById("decodeBtn");

const copyBtn = document.getElementById("copyBtn");

const clearBtn = document.getElementById("clearBtn");

const status = document.getElementById("status");


// ================================
// ENCODE FUNCTION
// ================================

async function encodeText() {

    // Get input
    const text = inputText.value.trim();


    // Check empty input
    if (text === "") {

        status.innerText =
            "Please enter some text first.";

        return;
    }


    // Show loading message
    status.innerText = "Encoding...";


    try {

        // Send request to backend
        const response = await fetch(
            "/api/encode",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    text: text,

                    method: method.value

                })
            }
        );


        // Convert response to JSON
        const data = await response.json();


        // Show result
        result.value = data.result;


        // Status
        status.innerText =
            "Text encoded successfully.";

    }

    catch (error) {

        console.error(error);

        status.innerText =
            "Something went wrong.";

    }

}


// ================================
// DECODE FUNCTION
// ================================

async function decodeText() {

    // Get input
    const text = inputText.value.trim();


    // Check empty input
    if (text === "") {

        status.innerText =
            "Please enter coded text.";

        return;
    }


    // Loading
    status.innerText = "Decoding...";


    try {

        // Send request
        const response = await fetch(
            "/api/decode",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    text: text,

                    method: method.value

                })
            }
        );


        // JSON response
        const data = await response.json();


        // Display result
        result.value = data.result;


        // Status
        status.innerText =
            "Text decoded successfully.";

    }

    catch (error) {

        console.error(error);

        status.innerText =
            "Something went wrong.";

    }

}


// ================================
// COPY RESULT
// ================================

async function copyResult() {

    // Check result
    if (result.value === "") {

        status.innerText =
            "There is no result to copy.";

        return;
    }


    try {

        // Copy text
        await navigator.clipboard.writeText(
            result.value
        );


        status.innerText =
            "Result copied successfully.";

    }

    catch (error) {

        console.error(error);

        status.innerText =
            "Unable to copy result.";

    }

}


// ================================
// CLEAR FUNCTION
// ================================

function clearAll() {

    // Clear input
    inputText.value = "";


    // Clear result
    result.value = "";


    // Reset status
    status.innerText = "Ready";

}


// ================================
// BUTTON EVENTS
// ================================


// Encode button
encodeBtn.addEventListener(
    "click",
    encodeText
);


// Decode button
decodeBtn.addEventListener(
    "click",
    decodeText
);


// Copy button
copyBtn.addEventListener(
    "click",
    copyResult
);


// Clear button
clearBtn.addEventListener(
    "click",
    clearAll
);


// ================================
// TECHNIQUE CHANGE
// ================================

method.addEventListener(
    "change",
    function () {

        status.innerText =
            "Technique changed to " +
            method.options[
                method.selectedIndex
            ].text;

    }
);