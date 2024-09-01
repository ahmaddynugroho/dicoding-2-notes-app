import { notesData } from "./notes.js";

/**
 * kriteria wajib:
 * 1. menampilkan daftar catatan dengan baik
 * 2. formulir tambah catatan
 * - judul dan isi
 * - isi menggunakan <textarea>
 * 3. css grid sebagai metode layouting
 * 4. bangun component ui dengan web component
 *  - minimal 3 custom element
 *
 * TODO:
 * 1. show notes [done]
 * 2. add notes [done]
 *
 * component:
 * 1. note's title [done]
 * 2. note's body [done]
 * 3. note's date [done]
 * 4. note's container [done]
 */

customElements.define(
  "note-title",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
        <p class="text-xl">
          ${this.getAttribute("value")}
        </p>
      `;
    }
  }
);

customElements.define(
  "note-date",
  class extends HTMLElement {
    connectedCallback() {
      const date = this.getAttribute("value").slice(0, 19).replace("T", " ");
      this.innerHTML = /*html*/ `
        <p class="text-xs opacity-50 ${this.getAttribute("class")}">
          ${date}
        </p>
      `;
    }
  }
);

customElements.define(
  "note-body",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
        <p class="font-light">
          ${this.getAttribute("value")}
        </p>
      `;
    }
  }
);

customElements.define(
  "note-card",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
        <div class="p-4 h-full rounded-lg bg-slate-900">
          <note-title value="${this.getAttribute("title")}"></note-title>
          <note-date class="mb-2" value="${this.getAttribute(
            "date"
          )}"></note-date>
          <note-body value="${this.getAttribute("body")}"></note-body>
        </div>
      `;
    }
  }
);

const notesContainer = document.querySelector("#notes");
const render = () => {
  notesContainer.innerHTML = "";
  notesData.forEach((note) => {
    notesContainer.innerHTML += /*html*/ `
    <note-card title="${note.title}" date="${note.createdAt}" body="${note.body}"></note-card>
  `;
  });
};
render();

const form = document.querySelector("#add-note");
form.onsubmit = (e) => {
  e.preventDefault();
  const title = document.querySelector("#add-title");
  const body = document.querySelector("#add-body");
  notesData.push({
    id: String(Date.now()),
    title: title.value,
    body: body.value,
    createdAt: new Date().toISOString(),
    archived: false,
  });
  title.value = "";
  body.value = "";

  console.debug(notesData);
  render();
};
