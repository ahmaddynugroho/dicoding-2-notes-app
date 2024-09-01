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
  },
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
  },
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
  },
);

customElements.define(
  "note-card",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/ `
        <div class="p-4 h-full rounded-lg bg-slate-900">
          <note-title value="${this.getAttribute("title")}"></note-title>
          <note-date class="mb-2" value="${this.getAttribute(
            "date",
          )}"></note-date>
          <note-body value="${this.getAttribute("body")}"></note-body>
        </div>
      `;
    }
  },
);

const api = "https://notes-api.dicoding.dev/v2/notes";
const notesContainer = document.querySelector("#notes");
const form = document.querySelector("#add-note");

let notesData = [];

const render = () => {
  notesContainer.innerHTML = "";
  notesData.forEach((note) => {
    notesContainer.innerHTML += /*html*/ `
    <note-card title="${note.title}" date="${note.createdAt}" body="${note.body}"></note-card>
  `;
  });
};

const fetchNotes = () => {
  fetch(api)
    .then((res) => res.json())
    .then(({ data }) => {
      notesData = data;
      render();
    });
};

form.onsubmit = (e) => {
  e.preventDefault();
  const title = document.querySelector("#add-title");
  const body = document.querySelector("#add-body");
  const note = {
    title: title.value,
    body: body.value,
  };
  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then((_) => fetchNotes());

  title.value = "";
  body.value = "";

  console.debug(notesData);
  render();
};

fetchNotes();
