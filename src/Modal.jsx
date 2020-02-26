import React, { useRef, useState } from "react";
import { useStateValue } from "./StateProvider";

import nav from "./nav.module.css";
import base from "./base.module.css";
import cx from "classnames";
import { catSort } from "./App";

export const Modal = () => {
  const node = useRef();
  const [state, dispatch] = useStateValue();
  const [newItemCategory, setNewItemCategory] = useState(
    state.wardrobe.categories[0].display
  );
  const [newCat, setNewCat] = useState({
    id: state.wardrobe.categories.length + 1,
    value: ""
  });
  const [newItem, setNewItem] = useState({
    id: state.wardrobe.items.length + 1,
    headline: "",
    category: 1,
    img: "/gray.jpg"
  });

  const handleModalClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const updateCategory = (id, value) => {
    if (id !== "new_category") {
      dispatch({
        type: "UPDATE_CATEGORY",
        categories: [
          ...state.wardrobe.categories.filter(c => c.id !== id),
          { id: id, display: value }
        ].sort(catSort)
      });
    } else {
      setNewCat({ id: newCat.id, display: value });
    }
  };
  const addCategory = () => {
    let newCats = [
      ...state.wardrobe.categories,
      { id: newCat.id, display: newCat.value }
    ].sort(catSort);
    dispatch({
      type: "UPDATE_CATEGORY",
      categories: newCats
    });
    setNewCat({
      id: newCats.length + 1,
      value: ""
    });
  };

  const addItem = () => {
    console.log(
      "ADD item with cat: ",
      state.wardrobe.categories.find(c => c.display === newItemCategory).id
    );
    let tempItem = {
      ...newItem,
      category: state.wardrobe.categories.find(
        c => c.display === newItemCategory
      ).id
    };
    let newItems = [...state.wardrobe.items, tempItem];
    dispatch({
      type: "UPDATE_ITEMS",
      items: newItems
    });
    dispatch({
      type: "TOGGLE_MODAL"
    });
    setNewItem({
      id: newItems.length + 1,
      headline: "",
      category: 1,
      img: "/gray.jpg"
    });
  };

  return (
    <div
      className={cx(nav.modal, nav.slideRight, nav.show)}
      onClick={e => handleModalClick(e)}
    >
      <div className={nav.modalDialog} ref={node}>
        {state.view.form === "ITEM" && (
          <div className={nav.modalContent}>
            <div className={nav.modalBody}>
              <h2 className={base.header2}>Add item</h2>
              <div className={base.dropZone}>Add a photo</div>
              <input
                type="text"
                key={newItem.id}
                className={cx(base.input)}
                value={newItem.headline}
                placeholder="Item description"
                onChange={e =>
                  setNewItem({ ...newItem, headline: e.target.value })
                }
              />
              {console.log(
                state.wardrobe.categories.find(c => c.id === newItem.category)
                  .display
              )}
              <select
                className={base.select}
                value={newItemCategory}
                onChange={e => setNewItemCategory(e.target.value)}
              >
                {state.wardrobe.categories.map(c => (
                  <option key={"cat-option-" + c.id} id={c.id}>
                    {c.display}
                  </option>
                ))}
              </select>
              <button
                disabled={newItem.headline.length < 3}
                className={base.button}
                onClick={() => addItem()}
              >
                Add
              </button>
            </div>
          </div>
        )}

        {state.view.form === "CATEGORY" && (
          <div className={nav.modalContent}>
            <div className={nav.modalBody}>
              <h2 className={base.header2}>Edit categories</h2>
              {state.wardrobe.categories.map(c => (
                <input
                  type="text"
                  key={c.id}
                  className={cx(base.input)}
                  value={c.display}
                  onChange={e => updateCategory(c.id, e.target.value)}
                />
              ))}
              <input
                type="text"
                key={"new_category"}
                className={cx(base.input, base.newInput)}
                value={newCat.value}
                placeholder={"new category..."}
                onChange={e =>
                  setNewCat({ id: newCat.id, value: e.target.value })
                }
              />
              <button
                disabled={newCat.value.length < 3}
                className={base.button}
                onClick={() => addCategory()}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
