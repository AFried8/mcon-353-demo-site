
import {TodoTitle} from '../todoTitle/todoTitle';
import {TodoEdit} from '../todoEdit/todoEdit';


export const Todo = () => {
    return (
      <div className="Todo">
          <TodoTitle/>
          <TodoEdit/>
      </div>
    );
  }
