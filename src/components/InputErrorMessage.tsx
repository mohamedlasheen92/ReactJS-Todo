interface IProps {
  message: string | undefined
}
const InputErrorMessage = ({ message }: IProps) => {
  return message ? <span className="text-red-700 text-sm font-semibold">{message}</span> : null;
}

export default InputErrorMessage;