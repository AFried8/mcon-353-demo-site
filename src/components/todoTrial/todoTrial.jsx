import React, {useState} from "react";

export const TodoTrial = (props) => {
    const [todos, setTodos] = useState(["hello", "goodbye"]);

    return(
        <div>
            {todos.map((todo) => (
                <TodoItem text={todo} />
            ))}
        </div>
    )
}

const TodoItem = (props) => {
    return <div>
        {props.text}
    </div>
};