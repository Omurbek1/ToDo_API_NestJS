import {
    Controller,
    Get,
    Body,
    Post,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { TodoDTO } from './todo.dto';
import { todos } from './todos-mock';

let todosData = todos;
@Controller('todos')
export class TodoController {
    @Get()
    getTodos(): TodoDTO[] {
        return todosData;
    }

    @Post()
    createToDo(@Body() createTodo: TodoDTO): TodoDTO {
        const newTodo: TodoDTO = {
            id: (todosData.length + 1).toString(),
            ...createTodo,
        };
        todosData = [...todosData, newTodo];
        return newTodo;
    }

    @Put(':id')
    updateToDo(@Body() updateToDo: TodoDTO, @Param('id') id): TodoDTO {
        todosData = todosData.map((todo) => (todo.id === id ? updateToDo : todo));
        return updateToDo;
    }

    @Delete(':id')
    deleteToDo(@Param('id') id): TodoDTO {
        const todoDelete = todosData.find((todo) => todo.id === id);
        todosData = todosData.filter((todo) => todo.id !== id);
        return todoDelete;
    }
}
