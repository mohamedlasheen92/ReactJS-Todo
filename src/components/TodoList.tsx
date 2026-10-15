import Button from "./ui/Button";
import axiosInstance from "../config/axiosConfig";
import {
  useQuery,
} from '@tanstack/react-query'


const TodoList = () => {
  const dataStr = localStorage.getItem('loggedInUser');
  const userData = dataStr ? JSON.parse(dataStr) : null;

  const { isPending, data } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/users/me?populate=todos', {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`
        }
      })
      return response.data;
    }
  })
  console.log(data);
  if (isPending) return "Loading todos...";

  return (
    <div className="space-y-1 ">

      {data?.todos?.length ? (data.todos.map(({ id, title }: { id: number, title: string }) => {
        return <div key={id} className="flex items-center justify-between hover:bg-gray-100 duration-300 rounded-md even:bg-gray-100 p-3">
          <p className="w-full font-semibold">{title}</p>
          <div className="flex items-center justify-end w-full space-x-3">
            <Button size={"sm"}>Edit</Button>
            <Button size={"sm"} variant="danger">Remove</Button>
          </div>
        </div>
      }))
        : <h3 className="text-center text-gray-500">No todos found</h3>}


    </div>

  );
};

export default TodoList;
