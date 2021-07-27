import React, { useEffect, useState, useContext } from 'react';
import useForm from '../hooks/form.js';
import { Button, Card, Elevation, Callout, Checkbox } from "@blueprintjs/core";
import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../context/Settings'


const ToDo = () => {

  const settings = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(settings.itemNumber);
  const { handleChange, handleSubmit } = useForm(addItem);



  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }


  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }


  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  useEffect(() => {
    addItem({
      text: 'Sample item',
      assignee: 'Test person',
      difficulty: 3,
    });
  }, []);

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(settings.itemNumber);
  }, [settings.itemNumber]);


  // === === hide completed todo's === === //
  function handleHide() {
    settings.setHide(true);
  }

  // === === hide === === //
  function hide() {
    if (item.complete === true) {
      return
      // let result = list.slice(startIndex, endIndex);
      // return result;
    }
  }


  // === === pagination change === === //
  function handlePaginationChange(e) {
    settings.setItemNumber(e.target.value);
  }

  // === === pagination === === //
  function pagination() {
    let result = list.slice(startIndex, endIndex);
    return result;
  }

  // === === next === === //
  function next() {
    setStartIndex(startIndex + settings.itemNumber - 1);
    setEndIndex(endIndex + settings.itemNumber);
  }

  // === === previous === === //
  function previous() {
    setStartIndex(startIndex - settings.itemNumber);
    setEndIndex(endIndex - settings.itemNumber);
  }


  return (
    <>
      <Callout interactive={false} elevation={Elevation.TWO}>
        <header>
          <h1>To Do List: {incomplete} items pending</h1>
        </header>
      </Callout>

      <Card interactive={true} elevation={Elevation.TWO}>
        <form onSubmit={handleSubmit}>

          <h2>Add To Do Item:</h2>

          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>

            <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            {/* <button type="submit">Add Item</button> */}
            <Button intent="primary" text="Add Item" onClick={handleSubmit} icon="add" />
          </label>


          <label>
            <span>Items Per Page</span>

            <input onChange={handlePaginationChange} defaultValue={3} type="range" min={1} max={5} name="items-per-page" />
          </label>


          <label>
            <Checkbox onClick={handleHide}>
              Hide Completed
            </Checkbox>
          </label>

          {/* <label>
            To Do Items Per Page:
            <div>
              <select onChange={handleChange}>
                <option selected>Choose items per page</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
              </select>
            </div>
          </label> */}

        </form>
      </Card>



      {
        pagination().map(item => (
          <div key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
            <hr />
          </div>
        ))
      }
      <Button intent="success" onClick={previous}>Previous</Button>
      <Button intent="success" onClick={next}>Next</Button>
    </>
  );
};

export default ToDo;
