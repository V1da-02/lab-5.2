import { getParent, getParentOfType, types } from "mobx-state-tree";
import RootStore from "../store/RootStore";

export const ContentModel = types
  .model("ContentModel", {
    id: types.identifier,
    title: "",
    description: "",
    seen: false,
    notes: "",
  })
  .views((self) => ({
    get isSeen() {
      return self.seen;
    },

    findInTitle(param: any) {
      self.title.includes(param);
    },
  }))
  .actions((self) => ({
    changeNotes(value: string) {
      self.notes = value;
    },

    changeSeen(state: boolean) {
      console.log(">>state", state);
      self.seen = state;
    },

    addNote() {
      const rootStore = getParentOfType(self, RootStore);
      rootStore.addNote(self);
    },

    removeNote() {
      const rootStore = getParentOfType(self, RootStore);
      rootStore.removeNote(self.id);
    },
  }));
