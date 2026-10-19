import Button from "./ui/Button";
import axiosInstance from "../config/axiosConfig";
import {
  useQuery,
} from '@tanstack/react-query'
import Skeleton from "./ui/Skeleton";
import Modal from "./ui/Modal";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";
import type { ITodo } from "../interfaces";


const TodoList = () => {
  // *** States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState<ITodo>({
    id: 0,
    documentId: '',
    title: '',
    description: ''
  });
  const [removedTodo, setRemovedTodo] = useState<ITodo>({
    id: 0,
    documentId: '',
    title: '',
    description: ''
  });
  const [queryVersion, setQueryVersion] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const dataStr = localStorage.getItem('loggedInUser');
  const userData = dataStr ? JSON.parse(dataStr) : null;

  const { isPending, data } = useQuery({
    queryKey: ['todos', `${queryVersion}`],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/users/me?populate=todos', {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`
        }
      })
      return response.data;
    }
  })

  // *** Handlers

  // *** Update a Todo
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }
  const openEditModal = (todo: ITodo) => {
    setIsEditModalOpen(true);
    setUpdatedTodo(todo);
  }
  const handleEditing = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, documentId } = updatedTodo;
    try {
      setIsEditing(true);
      const { status } = await axiosInstance.put(`/api/todos/${documentId}`, { data: { title, description } }, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      if (status === 200) {
        setQueryVersion(!queryVersion);
        closeEditModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  }
  const handleOnchange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value
    })
  }

  // *** Remove a Todo
  const closeRemoveModal = () => {
    setIsRemoveModalOpen(false);
  }
  const openRemoveModal = (todo: ITodo) => {
    setIsRemoveModalOpen(true);
    setRemovedTodo(todo)
  }
  const handleRemoving = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { documentId } = removedTodo;
    try {
      setIsRemoving(true);
      const { status } = await axiosInstance.delete(`/api/todos/${documentId}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      if (status === 204) {
        setQueryVersion(!queryVersion);
        closeRemoveModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsRemoving(false);
    }
  }


  if (isPending) return <Skeleton />;

  return (
    <>
      {/* Rendering Todos */}
      <div className="space-y-1">
        {data?.todos?.length ? (data.todos.map((todo: ITodo) => {
          return <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 rounded-md even:bg-gray-100 p-3">
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={() => openEditModal(todo)}>Edit</Button>
              <Button size={"sm"} variant={"danger"} onClick={() => openRemoveModal(todo)}>Remove</Button>
            </div>
          </div>
        }))
          : <h3 className=" text-center text-2xl font-medium text-gray-500 dark:text-gray-400">No todos found</h3>}
      </div>


      {/* Edit a todo MODAL */}
      <Modal isOpen={isEditModalOpen} closeModal={() => closeEditModal()} title="Editing a Todo">
        <form className="space-y-3" onSubmit={(event) => handleEditing(event)}>
          <Input name="title" value={updatedTodo.title} onChange={(event) => handleOnchange(event)} />
          <Textarea name="description" value={updatedTodo.description || ''} onChange={(event) => handleOnchange(event)} />
          <div className="flex space-x-3 justify-end">
            <Button loading={isEditing}>Done</Button>
            <Button type="button" variant={"cancel"} onClick={() => closeEditModal()}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Remove a todo MODAL */}
      <Modal isOpen={isRemoveModalOpen} closeModal={() => closeRemoveModal()} title="Remove a Todo">
        <form className="space-y-3" onSubmit={(event) => handleRemoving(event)}>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-500">
            Are you sure you want to remove this todo?{" "}
            <span className="font-medium text-red-600 dark:text-red-400">
              This action cannot be undone.
            </span>
          </p>
          <div className="flex space-x-3 justify-end">
            <Button variant={"danger"} loading={isRemoving}>Yes, Remove</Button>
            <Button type="button" variant={"cancel"} onClick={() => closeRemoveModal()}>Cancel</Button>
          </div>
        </form>
      </Modal>

    </>
  );
};

export default TodoList;
