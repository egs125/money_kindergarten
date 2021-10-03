import 'date-fns';
import React from 'react';
import {
  TextField, Button, FormControl, InputLabel, NativeSelect,
  FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const ItemDetail = ({
  type, item,
  onChangeItem, onClickPrevBtn, onClickSubmitBtn, onClickMovingCheckBox
}) => (
  <div className="item-container">
    <div className="item-detail">
      {type === 'incomes' ? (
        <>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="item-type-native">
              구분
            </InputLabel>
            <NativeSelect
              defaultValue="salary"
              value={item.itemType}
              inputProps={{
                name: 'itemType',
                id: 'item-type-native',
              }}
              onChange={onChangeItem}
            >
              <option value="salary">급여</option>
              <option value="financial">금융 수입</option>
              <option value="etc">기타 수입</option>
            </NativeSelect>
          </FormControl>
          <TextField
            required
            name="itemAmount"
            label="금액"
            value={item.itemAmount}
            onChange={onChangeItem}
          />
          <TextField
            name="remark"
            label="비고"
            value={item.remark}
            onChange={onChangeItem}
          />
        </>
      ): (
        <>
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
        </>
      )}

      {type === 'wishList' && (
        <>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked onChange={onClickMovingCheckBox} />}
              label="구매 완료!"
            />
          </FormGroup>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              // helperText="With min and max"
              // minDate={new Date("2018-03-01")}
              // maxDate={new Date("2018-06-01")}
              // value={selectedDate}
              // onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider> */}
          
          {/* <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          /> */}
        </>
      )}
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
