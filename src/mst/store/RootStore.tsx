import { applySnapshot, cast, getSnapshot, types } from "mobx-state-tree";
import { ContentModel } from "../model/Content.model";

const RootStore = types
  .model("RootStore", {
    contents: types.array(ContentModel),

    contents_notes: types.array(types.safeReference(ContentModel)),
  })
  .actions((self) => ({
    setDataToLocalStorage(value: any = {}, key: string = "intialState") {
      localStorage.setItem(key, JSON.stringify(value));
    },

    getDataFromLocalStorage(key: string = "initialState") {
      const content_notes = localStorage.getItem(key);
      return content_notes;
    },

    loadDataFromLocalStorage(key: string = "content_notes") {
      const content_notes = localStorage.getItem(key);
      if (!content_notes) return;

      const jsonData = JSON.parse(content_notes);
      const notes = types.array(ContentModel).create(jsonData);

      self.contents_notes.replace(notes);
    },

    removeLocalStorage(key: string = "initialState") {
      localStorage.removeItem(key);
      console.log(`>>${key} was removed`);
    },
  }))

  .actions((self) => ({
    setInitialStorageContents() {
      self.setDataToLocalStorage(self.contents);
    },

    addNote(note: any) {
      const current_notes = self.getDataFromLocalStorage("content_notes");
      if (!current_notes) {
        self.contents_notes.push(note);
        self.setDataToLocalStorage([note], "content_notes");
      } else {
        self.contents_notes.push(note);
        self.setDataToLocalStorage(
          [...JSON.parse(current_notes), note],
          "content_notes"
        );
      }
    },

    removeNote(id: string) {
      const updatesNotes = self.contents_notes.filter((content) => {
        if (content?.id !== id) {
          return true;
        } else {
          return false;
        }
      });

      console.log(">>updatesNotes", updatesNotes);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      applySnapshot(self.contents_notes, updatesNotes);

      self.removeLocalStorage("content_notes");
    },
  }));

export default RootStore;
