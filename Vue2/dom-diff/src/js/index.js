import { createElement, render, renderDOM } from "./virtualDom";
import domDiff from "./domDiff";
import doPatch from "./doPatch";

const vDom = createElement(
  "ul",
  {
    class: "list",
    style: "width: 300px;height:300px;background-color: orange",
  },
  [
    createElement(
      "li",
      {
        class: "item",
        "data-index": 0,
      },
      [
        createElement(
          "p",
          {
            class: "text",
          },
          ["第1个列表项"]
        ),
      ]
    ),
    createElement(
      "li",
      {
        class: "item",
        "data-index": 1,
      },
      [
        createElement(
          "p",
          {
            class: "text",
          },
          [
            createElement(
              "span",
              {
                class: "title",
              },
              []
            ),
          ]
        ),
      ]
    ),
    createElement(
      "li",
      {
        class: "item",
        "data-index": 2,
      },
      ["第3个列表项"]
    ),
  ]
);
const newDom = createElement(
  "ul",
  {
    class: "list-wrap",
    style: "width: 300px;height:300px;background-color: orange",
  },
  [
    createElement(
      "li",
      {
        class: "item",
        "data-index": 0,
      },
      [
        createElement(
          "p",
          {
            class: "title",
          },
          ["特殊列表项"]
        ),
      ]
    ),
    createElement(
      "li",
      {
        class: "item",
        "data-index": 1,
      },
      [
        createElement(
          "p",
          {
            class: "text",
          },
          []
        ),
      ]
    ),
    createElement(
      "div",
      {
        class: "item",
        "data-index": 2,
      },
      ["第3个列表项"]
    ),
  ]
);
const rDom = render(vDom);
renderDOM(rDom, document.querySelector("#app"));

const patches = domDiff(vDom, newDom);
console.log(patches);
doPatch(rDom, patches);
