import { useSyncExternalStore, useSyncExternalStore as useSyncExternalStore18 } from "react";

let isOpen = true; // Variable to store count
let subscribers = new Set(); // Set to store callback functions

const rightSideStore = {
  read() {
    // Method to get the count, this is basically getSnapshot method.
    return isOpen;
  },
  // Subscribe method adds the "callback" to the "subscribers" set, and
  // return a method to unsubscribe from the store.
  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
  // Method to increment the count
  open() {
    isOpen = true;
    subscribers.forEach((callback) => callback());
  },
  toggle() {
    isOpen = !isOpen;
    subscribers.forEach((callback) => callback());
  },
  close() {
    isOpen = false;
    subscribers.forEach((callback) => callback());
  },
};

export default function useRightSlide() {
  const state = useSyncExternalStore(rightSideStore.subscribe, rightSideStore.read);

  return {
    state,
    close: rightSideStore.close,
    open: rightSideStore.open,
    toggle: rightSideStore.toggle,
  };
}
