const fontSize = 18;
const indexSize = 12;
const gridSize = 30;
const redColor = "#FF0000";

const crossword = (words, extractions = []) => {
  const crosswordHTML = words
    .reduce((res, next) => {
      const { index, top, left, word, direction } = next;
      return `
      ${res}
      <span style="
        position: absolute;
        z-index: 1000;
        top: ${top * gridSize + 1}px;
        left: ${left * gridSize + 1}px;
        font-size: ${indexSize}px"
        >
        ${index}
      </span>
      ${processWord(top, left, word, direction)}
    `;
    }, "")
    .concat(processExtractions(extractions));

  const target = document.getElementById("target");
  target.style =
    "position: relative; margin: 0 auto; min-height: 200px; min-width: 200px";
  target.innerHTML = crosswordHTML;
};

const processWord = (top, left, word, direction) => {
  return word.split("").reduce(
    (res, letter, index) =>
      `${res}
        ${processLetter(top, left, letter, direction, index)}`,
    ""
  );
};

const processLetter = (top, left, letter, direction, index) => {
  const posTop =
    top * gridSize +
    (direction === "up" ? -1 : direction === "down" ? 1 : 0) * index * gridSize;
  const posLeft =
    left * gridSize +
    (direction === "right" ? 1 : direction === "left" ? -1 : 0) *
      index *
      gridSize;

  return letter === "_"
    ? printInputBox(posTop, posLeft)
    : printLetter(posTop, posLeft, letter);
};

const printLetter = (top, left, l) =>
  `<p style="
      position: absolute;
      top: ${top};
      left: ${left};
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${gridSize}px;
      height: ${gridSize}px;
      font-size: ${fontSize}px;
      margin: 0;
      border: 0.05px solid #888;
      padding: 0;
      box-sizing: border-box;
      z-index: 10;
      text-transform: uppercase;">
      ${l}
    </p>`;

const printInputBox = (top, left) =>
  `<input
    maxlength='1'
    style='
      position: absolute;
      top: ${top};
      left: ${left};
      width: ${gridSize}px;
      height: ${gridSize}px;
      padding: 0;
      margin: 0;
      outline: 0;
      font-size: ${fontSize}px;
      text-align: center;
      text-transform: uppercase;
      border: 0.05px solid #888;
      z-index: 1;
      box-sizing: border-box;'
    />`;

processExtractions = extractions =>
  extractions.reduce((res, next) => {
    const { index, top, left } = next;
    return `
      ${res}
      <span
        style="position: absolute;
        z-index: 1000;
        top: ${top * gridSize + gridSize - 14}px;
        left: ${left * gridSize + gridSize - 14}px;
        font-size: 12px;
        transform: scale(0.75);
        color: ${redColor}"
        >
        (${index})
      </span>`;
  }, "");
