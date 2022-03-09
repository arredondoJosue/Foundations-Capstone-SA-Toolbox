const textBox = document.querySelector("#paste-sid-box");
const pasteArea = document.querySelector("#formatted-sids");
const submitBtn = document.querySelector("button");
const addCard = document.querySelector("#add-bm");
const allCards = document.getElementsByClassName("All-BM-Cards");
const updateBtn = document.getElementsByClassName("update-sid");
const allInput = document.getElementsByClassName("card-text");
const generate = document.getElementsByClassName("generate-sid");
const dimensionCardTitles = document.querySelectorAll(".card-column-header");
const resetBtn = document.querySelector("#reset");

const baseURL = `http://localhost:5400/`;
const errCallback = (err) => console.log(err);

const main = () => {
  axios
    .get(baseURL)
    .then((res) => {
      console.log("hit main, connected to server");
      console.log(res.data);
    })
    .catch(errCallback);
};

const reset = () => {
  axios
    .get(baseURL + "reset")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        let { Dimension } = res.data[i];
        let { SIDs } = res.data[i];
        if (
          dimensionCardTitles[i].textContent === String(Dimension).toUpperCase()
        ) {
          allInput[i].placeholder = SIDs;
        } else {
          pasteArea.textContent = "Sample Text";
        }
      }
      pasteArea.textContent = "Sample Text";
    })
    .catch(errCallback);
};

const submit = () => {
  let text = document.querySelector("#paste-sid-box").value;
  text = text
    .trim()
    .replaceAll(/\t/g || /\s/g, ",")
    .split(",");

  let pastedSidsObj = {
    formattedSids: text,
  };
  axios
    .put(baseURL + "formatsids", pastedSidsObj)
    .then((res) => {
      let formattedSids = res.data;
      showSids(formattedSids);
    })
    .catch(errCallback);
};

const showSids = (obj) => {
  let text = document.querySelector("#paste-sid-box").value;
  text = text.trim().replaceAll(/\t/g || /\s/g, ",");
  pasteArea.textContent = text;

  axios.get(baseURL + "getdb").then((res) => {
    let dimDB = res.data;
    submitGenerate(dimDB, obj);
  });
};

const submitGenerate = (dimDB, sidsobj) => {
  for (let i = 0; i < dimensionCardTitles.length; i++) {
      let newArr = [];
      let { Dimension, SIDs } = dimDB[i];

    if(Dimension.toLowerCase() === dimensionCardTitles[i].textContent.toLowerCase()){
        for (let j = 0; j < SIDs.length; j++) {
          if (sidsobj.includes(SIDs[j])) {
            newArr.push(SIDs[j]);
          }
        }

    }
    pasteArea.innerHTML += `<br><br>` + `${Dimension}` + `:` + ` ${newArr}`;
  }
};

// Dummy Data - SIDs
// S35	S33	S97	S34	S28	S23	S48	S99	S30	S56	S47	S79	S49	S84	S59	S19	S62	S74	S60	S142	S143	S70	S73	S38	S139	S103	S104	S102	S127	S9	DW1	S144	S145	S22	S146	S129	S42	S107	S41	S17	S25	S115	S121	S95	S147	S118	S148	S114	S7	S43	S44


const updateBM = (e, inputs, c, iIt) => {
  let updateData = {
    placeholderText: e,
    inputText: allInput.item(iIt).value,
    itteration: iIt
}
  axios
    .put(baseURL + 'update', updateData)
    .then((res) => {
        let {inputText, itteration} = res.data

        inputText = String(inputText)
        allInput[itteration].placeholder = `${inputText}`
        allInput.item(itteration).value = ''
    })
    .catch(errCallback)
};

for (let i = 0; i < updateBtn.length; i++) {
  updateBtn.item(i).addEventListener("click", () => {
    updateBM(allInput.item(i).placeholder, allInput.item(i), allInput, i)
  });
}

submitBtn.addEventListener("click", submit);
resetBtn.addEventListener("click", reset);

main();
