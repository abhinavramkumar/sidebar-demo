import React, { createRef, useRef } from 'react';

function CustomAccordion({ items, groupIndex = 0 }) {
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

  return items?.map((group, index) =>
  (
    <div key={index}>
      {
        group.href ? (
          <a href={group.href} className='block bg-transparent border-none text-gray-700' onClick={e => e.stopPropagation()}>{group.name}</a>
        ) : (
          <button className='bg-transparent border-none text-gray-700' onClick={e => onClick(e, index)}>{group.name}</button>
        )
      }

      {group?.children?.length > 0 ? (
        <>
          <details key={index} id={`${groupIndex}#${index}`}
            ref={ref => detailsRef.current[`${groupIndex}#${index}`] = ref}>
            <summary className=''></summary>
            <CustomAccordion items={group.children ?? []} groupIndex={groupIndex + 1} />
          </details>
        </>
      ) : null}

    </div>
  ))
}

export default function Sidebar({ items = [] }) {
  return (
    <div className='w-1/4 bg-white h-screen overflow-y-auto'>
      <CustomAccordion items={items} groupIndex={0} />
    </div>

  )
}
