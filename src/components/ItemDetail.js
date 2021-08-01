import React from 'react';
import { TextField, Button } from '@material-ui/core';

const ItemDetail = ({ item, onChangeItem, onClickSubmitBtn }) => {
  return (
    <div>
      <TextField
        name="priority"
        label="우선순위"
        value={item.priority}
        onChange={onChangeItem}
      />

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
        type="number"
        value={item.itemPrice}
        onChange={onChangeItem}
      />

      <Button onClick={onClickSubmitBtn}>
        저장
      </Button>
    </div>
  );
};

export default ItemDetail;
