const baseURL = `http://localhost:5500/`

const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener(
  "click",
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
  },
  false
);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);




// (alias) var Chartist: ChartistStatic;


const overallCard = document.querySelector("#overall");
const dimensionsCard = document.querySelector("#dimensions");
const partiCard = document.querySelector("#parti");
const engagementCard = document.querySelector("#engagement");
const topFiveCard = document.querySelector("#top-five");
const bottomFiveCard = document.querySelector("#bottom-five");

const dimensionsGraph = (e) => {
  dimensionsCard.removeChild("img");
  dimensionsCard.innerHTML += `
    var data = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
          [5, 2, 4, 2, 0]
        ]
    };

      // Create a new line chart object where as first parameter we pass in a selector
      // that is resolving to our chart container element. The Second parameter
      // is the actual data object.
    new Chartist.Line('.ct-chart', data);
    
    `;
};

dimensionsCard.addEventListener("click", dimensionsGraph);

// new Chartist.Bar('#dimensions', {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     series: [
//       [5, 4, 3, 7, 5, 10, 3],
//       [3, 2, 9, 5, 4, 6, 4]
//     ]
//   }, {
//     seriesBarDistance: 10,
//     reverseData: true,
//     horizontalBars: true,
//     axisY: {
//       offset: 70
//     }
// });
  
// new Chartist.Pie('#parti', {
//     series: [20, 10, 30, 40]
//   }, {
//     donut: true,
//     donutWidth: 60,
//     donutSolid: true,
//     startAngle: 270,
//     showLabel: true
// });  





function handleFiles(e) {
    e.stopPropagation(); e.preventDefault();
    const f = e.dataTransfer.files[0];
    /* f is a File */
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = e.target.result;
      /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
      const workbook = XLSX.read(data);
  
      console.log(workbook);
    };
    reader.readAsArrayBuffer(f);
}

// drop_dom_element.addEventListener("drop", handleDrop, false);

const connect = axios.get(baseURL).then(function (res) {console.log('hit connect')})