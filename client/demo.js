const textBox = document.querySelector("#paste-sid-box");
const pasteArea = document.querySelector("#formatted-sids");
const submitBtn = document.querySelector("button");
const allInput = document.getElementsByClassName("card-text");
const generate = document.getElementsByClassName("generate-sid");
let demoCardText = document.querySelector("#standard-demo");
let deiCardText = document.querySelector("#dei-demo");
let cardBodyStandard = document.querySelector(".standardC");
let cardBodyDei = document.querySelector(".deiC");
const resetBtn = document.querySelector("#reset");

const showSids = (event) => {
  let text = document.querySelector("#paste-sid-box").value;
  text = text.trim().replaceAll(/\s/g, ",");
  text = text.split(",");

  let demoArr = text;

  let standardDemosArr = [];
  let deiDemosArr = [];

  demoArr.forEach((e, i) => {
    if (i === demoArr.length - 1) {
      standardDemosArr.push(
        ` '${e}'  : {'title' : {'9': '${e}'},'recoding' : 'null', 'manager_of_managers' : false, 'ona' : true}`
      );
    } else {
      standardDemosArr.push(
        ` '${e}'  : {'title' : {'9': '${e}'},'recoding' : 'null', 'manager_of_managers' : false, 'ona' : true},`
      );
    }
  });

  demoArr.forEach((e, i) => {
    if (i === demoArr.length - 1) {
      deiDemosArr.push(
        `'${e}' : {'title' : {'9': '${e}'},'recoding' : 'null', 'sort' : true}`
      );
    } else {
      deiDemosArr.push(
        `'${e}' : {'title' : {'9': '${e}'},'recoding' : 'null', 'sort' : true},`
      );
    }
  });

  standardDemosArr.forEach((e) => {
    cardBodyStandard.innerHTML += "<p class='demo-text'>" + e + "</p>";
  });
  deiDemosArr.forEach((e) => {
    cardBodyDei.innerHTML += "<p class='demo-text'>" + e + "</p>";
  });
};

const reset = () => {
  let demoList = document.querySelectorAll('.demo-text')
  for(let i = 0; i < demoList.length; i++){
    demoList[i].remove()
  }
}

submitBtn.addEventListener("click", showSids);
resetBtn.addEventListener("click", reset);

// Dummy Data for testing
// termed	survey_type	Engagement	Attrition	language	Tenure_Group	Gender	Division	Location	Manager_Status	Age_Group	D_DOH	D_TENURE	D_TENURE_GROUP	D_DOB	D_AGE	D_AGE_GROUP	D_GENDER	D_LOCATION	D_MANAGER_STATUS