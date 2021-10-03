import React from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import * as cm from 'share/common';

const IncomeList = ({
  curIncomeList,
  showDelBtn,
  deleteIncomeList,
  onEventHandler,
}) => {
  return (
    <>
      <div className="item-list-container">
      { Array.isArray(curIncomeList) &&
        curIncomeList.map((item, index) =>
          <div key={index} id={item.id} className="item-info-container" >
            <div
              className={`item-info${showDelBtn === item.id ? '-deletable' : ''}`}
              draggable
              onTouchStart={e => onEventHandler(e, item.id)}
              onTouchEnd={e => onEventHandler(e, item.id)}
            >
              <div className="item-text">
                {item.itemTypeName}
              </div>
              <div>
                {`${cm.addComma(item.itemAmount)}원`}
              </div>
            </div>

            {showDelBtn && showDelBtn === item.id && (
              <div className="icon">
                <IconButton onClick={() => deleteIncomeList(item.id)}>
                  <Delete />
                </IconButton>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default IncomeList;
