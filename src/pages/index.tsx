import React, { ReactNode, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type SafeHydrateProps = {
  children: ReactNode
}

function NoSSR({ children }: SafeHydrateProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

const finalSpaceCharacters = [
  {
    id: 'Doggo',
    name: 'Doggo Goodspeed',
    address: 'https://cdn.vidanimal.com.br/wp-content/uploads/cachorro-fofo-pug.jpg'
  },
  {
    id: 'Catmeow',
    name: 'Little Catmeow',
    address: 'https://i.pinimg.com/736x/8b/e1/70/8be1700e27b69a6c8b4d5852b02456f5.jpg'
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <NoSSR>
      <div className="App">
        <header className="App-header">
          <h1>ITEMS DND</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map(({ id, name, address }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className="characters-thumb">
                              <img src={address} alt={`${name} Thumb`} />
                            </div>
                            <p>
                              {name}
                            </p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </header>
      </div>
    </NoSSR>
  );
}

export default App;