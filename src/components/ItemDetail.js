import React from 'react';
import { TextField, Button } from '@material-ui/core';

const ItemDetail = ({ item, onChangeItem, onClickPrevBtn, onClickSubmitBtn }) => (
  <div className="item-container">
    <div className="item-detail">
      <TextField
        required
        name="itemName"
        label="품목명"
        value={item.itemName}
        onChange={onChangeItem}
      />
      <TextField
        required
        name="itemPrice"
        label="금액"
        value={item.itemPrice}
        onChange={onChangeItem}
      />
      <TextField
        name="priority"
        label="우선순위"
        value={item.priority}
        onChange={onChangeItem}
      />
      <TextField
        name="remark"
        label="비고"
        value={item.remark}
        onChange={onChangeItem}
      />       
    </div>
    
    <div className="item-btn-area">
      <Button
        variant="contained"
        onClick={onClickPrevBtn}
      >
        돌아가기
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onClickSubmitBtn}
      >
        저장
      </Button>
    </div>
  </div>
);

export default ItemDetail;
