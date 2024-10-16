
import { useTimestampWithSpinner } from '@/utils';
import { FaCheckDouble } from 'react-icons/fa';

const ChatMessage = ({ item, user }: any) => {
    const { formattedTime, isLoading } = useTimestampWithSpinner(item.time);
    
    console.log(item)
    return (
        <div
            className={`my-2 flex w-full ${item.senderId === user.id ? "flex-wrap justify-end" : "justify-start"
                }`}
        >
            <div
                className={`flex w-fit max-w-xs flex-col gap-1 rounded-md p-2 text-sm ${item.senderId === user.id
                    ? "bg-violet-normal text-white"
                    : "bg-orange-light text-left text-violet-dark"
                    }`}
            >
                <p>{item.content}</p>
                {isLoading ? (
                    <div className="flex items-center justify-end gap-2 text-[0.7rem]">
                        <span>____</span>
                        <span className="spinner"></span>
                    </div>
                ) : (
                    <div className="flex items-center justify-end gap-2 text-[0.7rem]">
                        <span>{formattedTime}</span>
                        {item.senderId === user.id && (
                            <span className="block">
                                <FaCheckDouble className="text-green-500" />
                            </span>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ChatMessage;
