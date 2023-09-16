import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

function CustomAccordion({ items, groupIndex = 0, styles = {
  container: "",
  button: "",
  summary: ""
} }) {
  const detailsRef = useRef({});
  function onClick(e, index) {
    e.stopPropagation();
    // open elements
    // current element =>
    const detailElements =
      document.querySelectorAll(`details[open][id^="${groupIndex}#"]`);
    if (detailsRef.current[`${groupIndex}#${index}`]) {
      if (detailsRef.current[`${groupIndex}#${index}`].open) {
        detailsRef.current[`${groupIndex}#${index}`].open = false;
      } else {
        detailsRef.current[`${groupIndex}#${index}`].open = true;
      }

      detailElements.forEach((element) => {
        if (detailsRef?.current[`${groupIndex}#${index}`].id !== element.id) {
          element.open = false;
          // find all its children and close them too.
          let openChildElements = element.querySelectorAll('details[open]');
          openChildElements.forEach(child => child.open = false)
        }
      });
    }
  }

  const paddingLeft = ((groupIndex + 1) * 5);
  console.log("-" + paddingLeft)

  return items?.map((group, index) =>
  (
    <div key={index} className={twMerge(styles?.container ?? "")}>
      {
        group.href ? (
          <a href={group.href} className={twMerge('block bg-transparent border-none text-gray-700 outline-none', styles?.button)} onClick={e => e.stopPropagation()}>{group.name}</a>
        ) : (
          <button className={twMerge('bg-transparent border-none text-gray-700 outline-none focus:outline-none', styles?.button ?? "")} onClick={e => onClick(e, index)}>{group.name}</button>
        )
      }

      {group?.children?.length > 0 ? (
        <>
          <details
            key={index} id={`${groupIndex}#${index}`}
            ref={ref => detailsRef.current[`${groupIndex}#${index}`] = ref}
          >
            <summary className={twMerge(styles.summary)}></summary>
            <CustomAccordion items={group.children ?? []} groupIndex={groupIndex + 1} styles={styles} />
          </details>
        </>
      ) : null}

    </div>
  ))
}

export default function Sidebar({ items = [], open = true, setOpen = () => { }, styles = {
  container: "",
  accordion: {
    container: "",
    button: "",
    summary: ""
  }
} }) {
  return (
    <aside className={twMerge('w-1/4 bg-white h-screen overflow-y-auto duration-150 relative pt-[48px]', styles?.container ?? "", open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-25")}>
      <CustomAccordion items={items} groupIndex={0} styles={styles.accordion} />

      <button className={twMerge("absolute top-0 right-2 block h-[48px] w-[48px] border-none focus:outline-none bg-transparent text-gray-700")} onClick={() => setOpen()}>x</button>
    </aside>
  )
}
