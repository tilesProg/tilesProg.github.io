import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DndPage({ todos, updateTodoStatus, removeTodo }) {
    const navigate = useNavigate();

    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        completed: {
            name: 'Completed',
            items: [],
        },
        blocked: {
            name: 'Blocked',
            items: [],
        },
    });

    useEffect(() => {
        setColumns({
            todo: {
                name: 'To Do',
                items: todos.filter(todo => todo.status === 'todo'),
            },
            inProgress: {
                name: 'In Progress',
                items: todos.filter(todo => todo.status === 'inProgress'),
            },
            completed: {
                name: 'Completed',
                items: todos.filter(todo => todo.status === 'completed'),
            },
            blocked: {
                name: 'Blocked',
                items: todos.filter(todo => todo.status === 'blocked'),
            },
        });
    }, [todos]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = Array.from(sourceColumn.items);
        const destItems = Array.from(destColumn.items);
        const [movedItem] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, movedItem);
            setColumns(prevColumns => ({
                ...prevColumns,
                [source.droppableId]: { ...sourceColumn, items: sourceItems },
            }));
        } else {
            destItems.splice(destination.index, 0, movedItem);
            setColumns(prevColumns => ({
                ...prevColumns,
                [source.droppableId]: { ...sourceColumn, items: sourceItems },
                [destination.droppableId]: { ...destColumn, items: destItems },
            }));
        }

        const newStatus = destination.droppableId;
        updateTodoStatus(movedItem.id, newStatus);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%', position: 'relative' }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    padding: '10px',
                    zIndex: 1000
                }}
            >
                Go to To-Do List Page
            </button>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(columns).map(([columnId, column]) => (
                    <div
                        key={columnId}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 20px',
                        }}
                    >
                        <h2>{column.name}</h2>
                        <Droppable droppableId={columnId}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                        padding: 4,
                                        width: 250,
                                        minHeight: 500,
                                    }}
                                >
                                    {column.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: 16,
                                                        margin: '0 0 8px 0',
                                                        minHeight: '50px',
                                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                        color: 'white',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <span>{item.title}</span>
                                                    <button
                                                        onClick={() => removeTodo(item.id)}
                                                        style={{
                                                            backgroundColor: '#1a1a1a',
                                                            color: 'white',
                                                            border: '2px solid transparent',
                                                            borderRadius: '4px',
                                                            padding: '2px',
                                                            cursor: 'pointer',
                                                            transition: 'border-color 0.3s ease, background-color 0.3s ease',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.borderColor = '#646cff';
                                                            e.currentTarget.style.backgroundColor = '#333';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.borderColor = 'transparent';
                                                            e.currentTarget.style.backgroundColor = '#1a1a1a';
                                                        }}
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
}

export default DndPage;
