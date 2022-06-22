// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamletca Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

// $('.col1').each(function(el, item){
//     if(item.innerText === '?'){
//     item.innerText = 'bye'}
//         })

function sortArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

async function retrieveCategories() {
  const res = await axios.get("https://jservice.io/api/categories?count=10000");
  sortArray(res.data);
  return res.data;
}
// retrieveCategories();
// async function retrieveCategoryNames() {
//   const res = await retrieveCategories();
//   const categoryNamesArr = [];
//   for (let category of res) {
//     categoryNamesArr.push(category.title);
//   }
//   return categoryNamesArr;
// }

// let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

// async function getCategoryIds() {
//   const categories = await retrieveCategories();
//   const categoryIDs = [];
//   for (let category of categories) {
//     categoryIDs.push(category.id);
//   }
//   return categoryIDs;
// }
/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
$("body").append(
  '<button onClick="document.location.reload(true)">Reset</button>'
);

async function getCategory(catId) {
  const questions = await axios.get(
    `https://jservice.io/api/category?id=${catId}`
  );
  return questions.data.clues;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  const $gameBoard = $("<table>");
  $gameBoard.attr("id", "game");
  const categories = await retrieveCategories();
  $gameBoard.append(`
<thead>
    <tr>
    <th data-cat-id="${categories[0].id}" class="top cat1">${categories[0].title}</th>
    <th data-cat-id="${categories[1].id}" class="top cat2">${categories[1].title}</th>
    <th data-cat-id="${categories[2].id}" class="top cat3">${categories[2].title}</th>
    <th data-cat-id="${categories[3].id}" class="top cat4">${categories[3].title}</th>
    <th data-cat-id="${categories[4].id}" class="top cat5">${categories[4].title}</th>
    <th data-cat-id="${categories[5].id}" class="top cat6">${categories[5].title}</th>
    </tr>
</thead>
<tbody>
  <tr>
    <td class='col0 row0'>?</td>
    <td class='col1 row0'>?</td>
    <td class='col2 row0'>?</td>
    <td class='col3 row0'>?</td>
    <td class='col4 row0'>?</td>
    <td class='col5 row0'>?</td>
  </tr>
  <tr>
    <td class='col0 row1'>?</td>
    <td class='col1 row1'>?</td>
    <td class='col2 row1'>?</td>
    <td class='col3 row1'>?</td>
    <td class='col4 row1'>?</td>
    <td class='col5 row1'>?</td>
  </tr>
  <tr>
    <td class='col0 row2'>?</td>
    <td class='col1 row2'>?</td>
    <td class='col2 row2'>?</td>
    <td class='col3 row2'>?</td>
    <td class='col4 row2'>?</td>
    <td class='col5 row2'>?</td>
  </tr>
  <tr>
    <td class='col0 row3'>?</td>
    <td class='col1 row3'>?</td>
    <td class='col2 row3'>?</td>
    <td class='col3 row3'>?</td>
    <td class='col4 row3'>?</td>
    <td class='col5 row3'>?</td>
  </tr
  <tr>
    <td class='col0 row4'>?</td>
    <td class='col1 row4'>?</td>
    <td class='col2 row4'>?</td>
    <td class='col3 row4'>?</td>
    <td class='col4 row4'>?</td>
    <td class='col5 row4'>?</td>
  </tr>
</tbody>`);
  $("body").prepend($gameBoard);

  $("table").on("click", "td", handleClick);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(evt) {
  const th = $("th");
  if ($(evt.target).text() === "?") {
    for (let i = 0; i < 6; i++) {
      if ($(evt.target).hasClass(`col${i}`)) {
        const questions = await getCategory(th[i].getAttribute("data-cat-id"));
        for (let y = 0; y < 5; y++) {
          if ($(evt.target).hasClass(`row${y}`)) {
            $(evt.target).text(`${questions[y].question}`);
          }
        }
      }
    }
  } else {
    for (let i = 0; i < 6; i++) {
      if ($(evt.target).hasClass(`col${i}`)) {
        const questions = await getCategory(th[i].getAttribute("data-cat-id"));
        for (let y = 0; y < 5; y++) {
          if ($(evt.target).hasClass(`row${y}`)) {
            $(evt.target).text(`${questions[y].answer}`);
          }
        }
      }
    }
  }
  //   console.log($(evt.target).attr("class"));
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

fillTable();
