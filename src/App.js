import React from "react";
import "./App.css";
import { Wardrobe } from "./Wardrobe";
import { StateProvider } from "./StateProvider";

const wardrobeItems = [
  {
    id: 1,
    headline: "Converse Chuck Taylor 70 - Hi",
    category: 1,
    img: "/converse.jpg"
  },
  {
    id: 2,
    headline: "Adidas Originals Stan Smith Recon",
    category: 1,
    img: "/adidas.jpg"
  },
  {
    id: 3,
    headline: "Reebok BB 4000 Mu x BBC",
    category: 1,
    img: "/reebok.jpg"
  },
  {
    id: 4,
    headline: "Puma Rider Play On",
    category: 1,
    img: "/puma.jpg"
  },
  {
    id: 5,
    headline: "The Duct Tape Years Bones Letters PO Hoodie",
    category: 2,
    img: "/ducttape.jpg"
  }
];

export const catSort = (ca, cb) => (ca.id > cb.id ? 1 : -1);

export const viewStates = {
  WARDROBE: "WARDROBE",
  ADD_CAT: "ADD_CAT",
  ADD_ITEM: "ADD_ITEM"
};

const initialState = {
  view: {
    current: viewStates.WARDROBE,
    modal: false,
    form: "ITEM",
    category: 1
  },
  wardrobe: {
    items: wardrobeItems,
    categories: [
      { id: 1, display: "Sneakers" },
      { id: 2, display: "Sweatshirts" }
    ]
  }
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "NAV":
      return { ...state, view: { current: action.data } };
    case "TOGGLE_MODAL":
      return {
        ...state,
        view: {
          ...state.view,
          modal: !state.view.modal,
          form: action.form ? action.form : "ITEM"
        }
      };
    case "SWITCH_CATEGORY":
      return {
        ...state,
        view: {
          category: state.wardrobe.categories.find(cat => cat.id === action.id)
            ? action.id
            : 1
        }
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        wardrobe: {
          ...state.wardrobe,
          categories: action.categories.sort(catSort)
        }
      };
    case "UPDATE_ITEMS":
      return {
        ...state,
        wardrobe: {
          ...state.wardrobe,
          items: [...action.items]
        }
      };
    default:
      return state;
  }
};

function App() {
  return (
    <div className="App">
      <StateProvider reducer={reducer} initialState={initialState}>
        <Wardrobe />
      </StateProvider>
    </div>
  );
}

export default App;
