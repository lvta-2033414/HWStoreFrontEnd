import React, { useEffect, memo } from 'react';

import '../cssfile/filter.css';

export const Filter = memo((props) => {
  console.log('Filter is rendered');
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <section className="filter-section">
      <div className="custom-container">
        <div className="filter-section-container">
          <div className="filter-section-title">Bộ lọc</div>
          <ul className="filter-product-section">
            {Object.getOwnPropertyNames(props.filter).map((option, index) => {
              return (
                <Row
                  key={index}
                  index={index}
                  option={option}
                  optionList={props.filter}
                />
              );
            })}
            <li className="filter-option-row">
              <div className="filter-title-container">
                <span className="filter-option-title">Giá</span>
                <div className="filter-button-container">
                  <button className="filter-option-button active">
                    Tăng dần
                  </button>
                  <button className="filter-option-button">Giảm dần</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
});

const Row = (props) => {
  useEffect(() => {
    const propertyList = Object.keys(props.optionList);
    propertyList.forEach((property, index) => {
      const arrayOfButton = document.getElementsByClassName(
        `filter-option-button${index}`,
      );
      for (const button of arrayOfButton) {
        if (button.classList.contains('active')) {
          button.classList.remove('active');
        }
        if (button.innerText === 'Tất cả') {
          button.classList.add('active');
        }
      }
    });
  });
  return (
    <li className="filter-option-row">
      <div className="filter-title-container">
        <span className="filter-option-title">{props.option}</span>
      </div>
      <div className="filter-button-container">
        {props.optionList[props.option].map((element, index) => {
          return (
            <button
              onClick={addActiveClass}
              key={index}
              id={props.index.toString() + index.toString()}
              className={
                element === 'Tất cả'
                  ? `filter-option-button filter-option-button${props.index} active`
                  : `filter-option-button filter-option-button${props.index}`
              }>
              {element}
            </button>
          );
        })}
      </div>
    </li>
  );
};

// const condition = [];

const addActiveClass = (event) => {
  const cssClass = `.filter-option-button${event.currentTarget.id.slice(0, 1)}`;
  const listOfButton = document.querySelectorAll(cssClass);
  listOfButton.forEach((button) => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    }
  });
  document.getElementById(`${event.currentTarget.id}`).classList.add('active');
};

// const changeActiveButton = (event) => {
//   document.getElementById(`${event.currentTarget.id}`).classList.add('active');
//   // document.
// };
