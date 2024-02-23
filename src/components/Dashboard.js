import "./styles.css";
import { useState, useEffect } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import ListItem from "./ListItem";
import Nav from "./Nav";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const Dashboard = () => {
  const elements = [
    { id: "one", content: "zero", link: "002.png" },
    { id: "two", content: "one", link: "003.png" },
    { id: "three", content: "two", link: "004.png" },
    { id: "four", content: "three", link: "005.png" },
    { id: "five", content: "four", link: "006.png" },
    { id: "six", content: "four", link: "007.png" },
  ];
  // const [items, setItems] = useState(elements);

  const [items, setItems] = useLocalStorage("ele");

  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    console.log(sourceId);
    console.log(sourceIndex);
    console.log(targetIndex);
    console.log(targetId);

    const result = swap(items, sourceIndex, targetIndex);
    return setItems(result);
  }

  const deleteItem = (idx) => {
    const copyOfState = items.slice();
    console.log(copyOfState);
    const deletedElement = copyOfState.splice(idx, 1);
    console.log(deletedElement);
    console.log(copyOfState);
    // setDeletedItems([...deletedElement, ...deletedItems]);
    setItems(copyOfState);

    // console.log("++deletedItems", deletedItems);
  };

  useEffect(() => {
    if (!items) {
      setItems(elements);
    }
  }, []);

  return (
    <>
      <Nav />

    

            <div>  {" "}


      <GridContextProvider onChange={onChange}>
        <div className="container">
          <GridDropZone
            className="dropzone left"
            id="left"
            boxesPerRow={2}
            rowHeight={300}
            row
          >
                       <div className="center">
              <GridItem
                key={"zero"}
                index={0}
                style={{ margin: "2px", width: "1000px" }}
              >
                <Card
                  sx={{
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "-webkit-grab",
                    draggable: "true",
                    height: "300px",
                    margin: "2px",
                    maxWidth: "2000px",
                  }}
                >
                  <CardContent>
                    <div>
                      <button
                        style={{ float: "right" }}
                        onClick={() => deleteItem(1)}
                      >
                        x
                      </button>
                    </div>
                    <img
                      src="images/001.png"
                      alt="001"
                      draggable="true"
                      style={{ width: "900px" }}
                    />
                  </CardContent>
                </Card>
              </GridItem>
            </div>
           
           
            {items?.map((item, index) => (
              <GridItem key={item.id} index={index} style={{ margin: "2px" }}>
                <Card
                  sx={{
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "-webkit-grab",
                    draggable: "true",
                    height: "300px",
                    margin: "2px",
                  }}
                >
                  <CardContent>
                    <button
                      style={{ float: "right" }}
                      onClick={() => deleteItem(index)}
                    >
                      x
                    </button>
                    <img
                      src={`images/${item.link}`}
                      alt={item.id}
                      draggable="true"
                    />
                  </CardContent>
                </Card>
              </GridItem>
            ))}
            <div className="center">
              <GridItem
                key={"zero"}
                index={0}
                style={{ margin: "2px", width: "1000px" }}
              >
                <Card
                  sx={{
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "-webkit-grab",
                    draggable: "true",
                    height: "300px",
                    margin: "2px",
                    maxWidth: "2000px",
                  }}
                >
                  <CardContent>
                    <div>
                      <button
                        style={{ float: "right" }}
                        onClick={() => deleteItem(1)}
                      >
                        x
                      </button>
                    </div>
                    <img
                      src="images/008.png"
                      alt="001"
                      draggable="true"
                      style={{ width: "900px" }}
                    />
                  </CardContent>
                </Card>
              </GridItem>
            </div>
          </GridDropZone>
        </div>
      </GridContextProvider>
      </div>


    </>
  );
};

export default Dashboard;
