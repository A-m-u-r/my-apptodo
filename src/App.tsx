import React, {useState} from 'react';
import {initialData} from './components/initial-data';
import {DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle} from 'react-beautiful-dnd';
import 'reset-css';

// ф-ия которая добавляет Id элементу по кол-ву символов
const getItems = (count: number) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result

function reorder<Item>(list: Item[], startIndex: number, endIndex: number): Item[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;
const getItemStyle = (isDragging: boolean, draggableStyle:  DraggingStyle | NotDraggingStyle | undefined, ):React.CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

const App = () => {
    const [items, setItems] = useState<{id: string, content: string}[]>(getItems(10));

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const it = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(
            it
        );
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {items.map((item, index) => (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
export default App;
