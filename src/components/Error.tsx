type Props = {
  message: string;
};

const Error = ({ message }: Props) => (
  <div className="text-center my-10 text-red-500">
    <p>{message}</p>
  </div>
);

export default Error;
