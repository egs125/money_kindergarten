import React from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import * as cm from 'share/common';

const ItemList = ({
  type,
  curItemList,
  showDelBtn,
  deleteItem,
  onEventHandler,
}) => (
  <>
    <div className="item-list-container">
    { Array.isArray(curItemList) &&
      curItemList.map((item, index) =>
        <div key={index} id={item.id} className="item-info-container" >
          <div
            className={`item-info${showDelBtn === item.id ? '-deletable' : ''}`}
            draggable
            onTouchStart={e => onEventHandler(e, item.id)}
            onTouchEnd={e => onEventHandler(e, item.id)}
          >
            <div className="item-text">
              { type === 'income' ? item.itemTypeName : item.itemName}
            </div>
            <div>
              { type === 'income' ? `${cm.addComma(item.itemAmount)}원` : `${cm.addComma(item.itemPrice)}원`}
            </div>
          </div>

          {showDelBtn && showDelBtn === item.id && (
            <div className="icon">
              <IconButton onClick={() => deleteItem(item.id)}>
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </div>
  </>
);

export default ItemList;
