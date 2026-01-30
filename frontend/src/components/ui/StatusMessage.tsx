interface StatusMessageProps {
    message: string;
  }
  
  const StatusMessage = ({ message }: StatusMessageProps) => {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-600">
        {message}
      </div>
    );
  }


  export default StatusMessage;