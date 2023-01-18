<script lang="ts">
	import { Button, Card, Input, Label, Textarea } from "flowbite-svelte";

    let newTodoTextField = "";

    interface TodoItem {
        name: string;
        done: boolean;
        edit: boolean;
    }

    let todos:Array<TodoItem> = [{name: 'Default todo', done: false, edit: false}];

    const AddTodo = () => {
        todos = [...todos, {name: newTodoTextField, done: false} as TodoItem];
        newTodoTextField = "";
    }

    const ToggleEdit = (todo:TodoItem) => {
        todo.edit = !todo.edit;
        todos = [...todos];
    }

    const DeleteTodo = (todo:TodoItem) => {
        todos = [...todos.filter((t) => { return t !== todo})];
    }

    const MarkAsDone = (todo:TodoItem, b:boolean) => {
        todo.done = b;
        if(todo.done) { todo.edit = false }
        todos = [...todos];
    }

</script>
<div class="flex-row gap-5">
    {#each todos as todo}
    <Card vertical class="flex w-100 max-w-full mb-2">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Todo item</h5>

        <div>
            <Label for="todo-desc" class="mb-2">Description</Label>
            <Input disabled={!todo.edit || todo.done} bind:value={todo.name} type="text" id="todo-desc" placeholder="Todo-text" />
        </div>

        <div class="mt-2 flex row justify-between">
            <div>
                <Button disabled={todo.done} on:click={()=>ToggleEdit(todo)}>Edit</Button>
                <Button color="green" on:click={()=>MarkAsDone(todo, !todo.done)}>{todo.done ? 'Undone' : 'Done'}</Button>
            </div>
            <Button color="red" on:click={()=>DeleteTodo(todo)}>Delete</Button>
        </div>
    </Card>
    {/each}
</div>

<div class="mt-10">
    <Label for="new-todo" class="mb-2">Add new todo-item</Label>
    <Input bind:value={newTodoTextField} id="new-todo" type="text" placeholder="New Todo" />
    <Button class="mt-2" on:click={()=>AddTodo()}>+ Add</Button>
</div>

<div class="mt-10">
    <Label for="json-id" class="mb-2">JSON data</Label>
    <Textarea disabled id="json-id" placeholder="JSON data" rows="4" name="message" value={JSON.stringify(todos)}/>
</div>