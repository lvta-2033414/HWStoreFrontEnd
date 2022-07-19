import React, { memo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import '../cssfile/filter.css';

export const Filter = memo((props) => {
  const location = useLocation();
  let condition = useRef({});
  let tempProductArray = [...props.productList];

  const performFilter = () => {
    console.log(condition.current);
    tempProductArray = [...props.productList];
    let tempArray = [];
    for (const property in condition.current) {
      tempArray = [];
      tempProductArray.forEach((product) => {
        switch (property) {
          case 'name':
            if (
              product[property]
                .toLowerCase()
                .includes(condition.current[property].toLowerCase())
            ) {
              tempArray.push(product);
            }
            break;
          case 'Chipset':
            if (
              product[property]
                .toLowerCase()
                .includes(condition.current[property].toLowerCase())
            ) {
              tempArray.push(product);
            }
            break;
          default:
            if (
              product[property]
                .toString()
                .toLowerCase()
                .includes(condition.current[property].toLowerCase())
            ) {
              tempArray.push(product);
            }
        }
      });
      tempProductArray = [...tempArray];
    }
    if (tempProductArray.length === 0) {
      tempProductArray.push(null);
    }
    props.setFilteredProduct(tempProductArray);
    props.setRerender((prevState) => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    condition.current = {};
  }, [location]);
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
                  condition={condition}
                  filterHandler={performFilter}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
});

const Row = (props) => {
  const location = useLocation();
  const checkPropertiesOfCondition = (event) => {
    if (event.currentTarget.innerText === 'Tất cả') {
      delete props.condition.current[converter(props.option)];
    } else {
      if (event.currentTarget.innerText === 'NVIDIA') {
        props.condition.current[converter(props.option)] = 'GeForce';
      } else {
        props.condition.current[converter(props.option)] =
          event.currentTarget.innerText;
      }
    }
    props.filterHandler();
  };

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
  }, [location]);
  return (
    <li className="filter-option-row">
      <div className="filter-title-container">
        <span className="filter-option-title">{props.option}</span>
      </div>
      <div className="filter-button-container">
        {props.optionList[props.option].map((element, index) => {
          return (
            <button
              onClick={(event) => {
                addActiveClass(event);
                checkPropertiesOfCondition(event);
              }}
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

const PriceSortButton = (props) => {
  return (
    <li className="filter-option-row">
      <div className="filter-title-container">
        <span className="filter-option-title">Giá</span>
        <div className="filter-button-container">
          <button
            id="filter-option-button-increase"
            className="filter-option-button active"
            onClick={(event) => {
              addActiveClass2(event, props.condition);
              props.filterHandler();
            }}>
            Tăng dần
          </button>
          <button
            id="filter-option-button-decrease"
            className="filter-option-button"
            onClick={(event) => {
              addActiveClass2(event, props.condition);
              props.filterHandler();
            }}>
            Giảm dần
          </button>
        </div>
      </div>
    </li>
  );
};

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

const addActiveClass2 = (event, condition) => {
  event.currentTarget.classList.add('active');
  if (event.currentTarget.id === 'filter-option-button-increase') {
    document
      .getElementById('filter-option-button-decrease')
      .classList.remove('active');
    condition.current.price = 'INC';
  } else {
    document
      .getElementById('filter-option-button-increase')
      .classList.remove('active');
    condition.current.price = 'DEC';
  }
};

const converter = (input) => {
  let result;
  switch (input) {
    case 'Series':
      result = 'name';
      break;
    case 'Thương hiệu':
      result = 'brand';
      break;
    case 'Số nhân':
      result = 'Core';
      break;
    case 'Dung lượng':
      result = 'Capacity';
      break;
    case 'Kích thước':
      result = 'Size';
      break;
    default:
      result = input;
  }
  return result;
};
