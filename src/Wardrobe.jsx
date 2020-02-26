import React from "react";
import { useStateValue } from "./StateProvider";
// import { viewStates } from "./App";
import nav from "./nav.module.css";
import base from "./base.module.css";
import cx from "classnames";
import { Modal } from "./Modal";
import { catSort } from "./App";

export const Wardrobe = () => {
  const [state, dispatch] = useStateValue();

  const switchCategory = id => dispatch({ type: "SWITCH_CATEGORY", id });
  const addItem = () => dispatch({ type: "TOGGLE_MODAL", form: "ITEM" });
  const addCategory = () =>
    dispatch({ type: "TOGGLE_MODAL", form: "CATEGORY" });

  return (
    <div className={base.container}>
      <h1 className={base.header1}>Wardrobe</h1>
      <div className={nav.container}>
        {state.wardrobe.categories.sort(catSort).map(cat => (
          <div
            key={cat.id}
            onClick={() => switchCategory(cat.id)}
            className={cx(
              nav.item,
              state.view.category === cat.id ? nav.active : ""
            )}
          >
            {cat.display}
          </div>
        ))}
        <div onClick={e => addCategory()} className={cx(nav.item, nav.new)}>
          Edit categories
        </div>
      </div>

      <div className={cx("wardrobeList", base.productList)}>
        {state.wardrobe.items
          .filter(i => i.category === state.view.category)
          .map(item => (
            <div key={item.id} className={base.card}>
              <img src={item.img} className={base.img} alt="" />
              <div className={base.content}>{item.headline}</div>
            </div>
          ))}
        {state.wardrobe.items.filter(i => i.category === state.view.category)
          .length > 1 && (
          <div
            onClick={() => addItem()}
            key="placeholder-add"
            className={cx(base.card, base.cardPlaceholder)}
          >
            <img src="/gray.jpg" className={base.img} alt="" />
            <div className={base.content}>Add another item</div>
          </div>
        )}
      </div>
      {state.wardrobe.items.filter(i => i.category === state.view.category)
        .length < 1 && (
        <div className={cx(base.header2, base.placeholderContent)}>
          You haven't{" "}
          <span className={base.link} onClick={() => addItem()}>
            added your items
          </span>{" "}
          yet!
        </div>
      )}

      {!!state.view.modal && <Modal />}
    </div>
  );
  //   switch (state.current) {
  //     case viewStates.WARDROBE:
  //       return (
  //         <div>
  //           <h1>Wardrobe</h1>
  //           <div className={nav.container}>
  //             <div>Sneakers</div>
  //             <div
  //               onClick={() =>
  //                 dispatch({ type: "NAV", data: viewStates.ADD_CAT })
  //               }
  //             >
  //               Add
  //             </div>
  //           </div>
  //         </div>
  //       );
  //       break;
  //     case viewStates.ADD_ITEM:
  //       return <div>ADD ITEm</div>;
  //       break;
  //     case viewStates.ADD_CAT:
  //       return <div>ADD category</div>;
  //       break;
  //     default:
  //       return <div>Wardrobe</div>;
  //       break;
  //   }
};
