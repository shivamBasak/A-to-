selectTag = document.querySelectorAll("select")
to_text = document.querySelector(".to-text")
gettext = document.querySelector(".from-text")
copy = document.querySelector("#fromcopy")
copy2 = document.querySelector("#tocopy")
speak1 = document.querySelector("#fromspeak")
speak2 = document.querySelector("#tospeak")
exchange = document.querySelector(".exchange")

speak1.addEventListener("click", () => {
    speak(gettext.value, selectTag[0].value
    );
})
speak2.addEventListener("click", () => {
    speak(to_text.value, selectTag[1].value);
    console.log("hit")
})
function speak(text, lang) {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.lang = lang;
    synth.speak(utterance);
}

const copy_content = (values) => {
    navigator.clipboard.writeText(values).then(() => { return 1 }).catch((err) => { return -1; });
}
copy.addEventListener("click", () => {
    copy_content(gettext.value)
})
copy2.addEventListener("click", () => {
    copy_content(to_text.value)
})


selectTag.forEach((tag, id) => {
    for (let language in languages) {
        let selected = ""

        if (id == 0 && language == "en-GB") selected = "selected"
        else if (id == 1 && language == "hi-IN") selected = "selected"
        let option = `<option value="${language}" ${selected}>${languages[language]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

exchange.addEventListener("click", () => {
    let tempval = to_text.value
    to_text.value = gettext.value
    gettext.value = tempval;
    console.log(tempval)

    temp = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = temp;
})
const copycontent = (values) => {
    navigator.clipboard.writeText(values).then(() => { return 1 }).catch((err) => { return -1; });

}

translatedtext = document.querySelector("button")
translatedtext = translatedtext.addEventListener("click", () => {
    FromLanguage = selectTag[0].value;
    toLanguage = selectTag[1].value;
    let text = gettext.value
    if (!text) {
        to_text.value = ""
        to_text.setAttribute("placeholder", "");
        return;

    }
    else to_text.setAttribute("placeholder", "Translating..")

    console.log(FromLanguage)
    console.log(toLanguage)
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${FromLanguage}|${toLanguage}`;

    console.log(url)
   
    fetch(url).then(res => res.json()).then(data => {
        to_text.value = data.responseData.translatedText
        console.log(data)
    })
})
