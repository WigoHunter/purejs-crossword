const fontSize = 18;
const indexSize = 12;
const gridSize = 30;

const crossword = words => {
  const crosswordHTML = words.reduce((res, next, index) => {
    const { x, y, word, direction } = next;
    return `
    ${res}
    <span style="
      position: absolute;
      top: ${x * gridSize + 1}px;
      left: ${y * gridSize + 1}px;
      font-size: ${indexSize}px"
      >
      ${index + 1}
    </span>
    ${processWord(x, y, word, direction)}`;
  }, "");

  const target = document.getElementById("target");
  target.style =
    "position: relative; margin: 0 auto; min-height: 200px; min-width: 200px";
  target.innerHTML = crosswordHTML;
};

const processWord = (x, y, word, direction) => {
  return word.split("").reduce(
    (res, letter, index) =>
      `${res}
        ${processLetter(x, y, letter, direction, index)}`,
    ""
  );
};

const processLetter = (x, y, letter, direction, index) => {
  const posX =
    x * gridSize +
    (direction === "up" ? -1 : direction === "down" ? 1 : 0) * index * gridSize;
  const posY =
    y * gridSize +
    (direction === "right" ? 1 : direction === "left" ? -1 : 0) *
      index *
      gridSize;

  return letter === "_"
    ? printInputBox(posX, posY)
    : printLetter(posX, posY, letter);
};

const printLetter = (x, y, l) =>
  `<p style="
      position: absolute;
      top: ${x};
      left: ${y};
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

const printInputBox = (x, y) =>
  `<input
    maxlength='1'
    style='
      position: absolute;
      top: ${x};
      left: ${y};
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
