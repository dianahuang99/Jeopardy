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
function sortArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

async function retrieveCategories() {
  const res = await axios.get("https://jservice.io/api/categories?count=100");
  sortArray(res.data);
  return res.data;
}
async function retrieveCategoryNames() {
  const res = await retrieveCategories();
  const categoryNamesArr = [];
  for (let category of res) {
    categoryNamesArr.push(category.title);
  }
  return categoryNamesArr;
}

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const categories = await retrieveCategories();
  const categoryIDs = [];
  for (let category of categories) {
    categoryIDs.push(category.id);
  }
  return categoryIDs;
}
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

async function getCategory(catId) {
  const questions = await axios.get(
    `https://jservice.io/api/category?id=${catId}`
  );
  return questions.data;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

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

async function makeBoard() {
  const $gameBoard = $("<table>");
  const categoryNames = await retrieveCategoryNames();
  $gameBoard.append(`
<thead>
    <tr>
    <th>${categoryNames[0]}</th>
    <th>${categoryNames[1]}</th>
    <th>${categoryNames[2]}</th>
    <th>${categoryNames[3]}</th>
    <th>${categoryNames[4]}</th>
    <th>${categoryNames[5]}</th>
    </tr>
</thead>
<tbody>
  <tr>
    <td class='row1' >?</td>
    <td class='row1'>?</td>
    <td class='row1'>?</td>
    <td class='row1'>?</td>
    <td class='row1'>?</td>
    <td class='row1'>?</td>
  </tr>
  <tr>
    <td class='row2'>?</td>
    <td class='row2'>?</td>
    <td class='row2'>?</td>
    <td class='row2'>?</td>
    <td class='row2'>?</td>
    <td class='row2'>?</td>
  </tr>
  <tr>
    <td class='row3'>?</td>
    <td class='row3'>?</td>
    <td class='row3'>?</td>
    <td class='row3'>?</td>
    <td class='row3'>?</td>
    <td class='row3'>?</td>
  </tr>
  <tr>
    <td class='row4'>?</td>
    <td class='row4'>?</td>
    <td class='row4'>?</td>
    <td class='row4'>?</td>
    <td class='row4'>?</td>
    <td class='row4'>?</td>
  </tr>
  <tr>
    <td class='row5'>?</td>
    <td class='row5'>?</td>
    <td class='row5'>?</td>
    <td class='row5'>?</td>
    <td class='row5'>?</td>
    <td class='row5'>?</td>
  </tr>
</tbody>`);
  $("body").prepend($gameBoard);
}
makeBoard();
