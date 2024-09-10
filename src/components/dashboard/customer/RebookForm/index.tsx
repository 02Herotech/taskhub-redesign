import React, { useState } from 'react';
import Button from '@/components/global/Button';
import { DropReviewSvg, RebookSvg } from '@/lib/svgIcons';
import ReactDatePicker from 'react-datepicker';
import { FaSortDown } from 'react-icons/fa';
import { formatAmount } from '@/lib/utils';
import { useRebookJobMutation } from '@/services/bookings';

interface RebookFormProps {
    onClose: () => void;
    jobId: number;
}

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
}

interface FormErrors {
    date: string;
    time: string;
    amount: string;
    description: string;
}

interface PreviewProps {
    date: Date | null;
    time: Date | null;
    amount: number;
    description: string;
    onSubmit: () => void;
    onBack: () => void;
    onClose: () => void;
    isLoading: boolean;
    jobId: number;
    success: boolean;
    error: string;
}

const Preview: React.FC<PreviewProps> = ({ date, time, amount, description, onSubmit, onBack, isLoading, jobId, success, onClose, error }) => {
    return (
        <>
            {success ? (
                <div className="flex items-center justify-center h-full font-satoshi">
                    <div className="flex flex-col items-center space-y-4">
                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="35" cy="35" r="35" fill="#C1F6C3" fill-opacity="0.6" />
                            <circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                            <path d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z" fill="#4CAF50" />
                        </svg>
                        <h1 className="font-satoshiBold text-3xl text-primary">
                            Re-book offer sent
                        </h1>
                        <p className="font-satoshiMedium text-base font-medium text-[#140B31] text-center">
                            Your re-booking request has been sent to the service provider. You will be notified once they accept or reject your request.
                        </p>
                        <Button
                            className="max-lg:text-sm rounded-full"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="font-satoshiMedium text-base font-medium text-[#140B31]">
                        Please be reminded: there will be a charge for re-booking a task once it&apos;s completed. (Your re-booking details are listed below)
                    </p>
                    <p className="font-satoshiBold text-base font-bold underline underline-offset-4 text-primary">
                        Re-booking Details
                    </p>
                    <div className='flex items-center space-x-3'>
                        <p className="font-semibold text-tc-orange">Date:</p>
                        <p className='font-satoshiMedium text-base font-medium text-[#140B31]'>
                            {date ? date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            }) : 'Not selected'}
                        </p>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <p className="font-semibold text-tc-orange">Time:</p>
                        <p className='font-satoshiMedium text-base font-medium text-[#140B31]'>
                            {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not selected'}
                        </p>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <p className="font-semibold text-tc-orange">Amount:</p>
                        <p className='font-satoshiMedium text-base font-medium text-[#140B31]'>
                            {formatAmount(amount, "USD", false)}
                        </p>
                    </div>
                    <div className='flex items-start space-x-3'>
                        <p className="font-semibold text-tc-orange">Description:</p>
                        <p className='font-satoshiMedium text-base font-medium text-[#140B31]'>{description}</p>
                    </div>
                    <div className="flex items-center justify-center space-x-5 !mt-8">
                        <Button
                            className="max-lg:text-sm rounded-full"
                            onClick={onBack}
                            type="button"
                            theme='outline'
                        >
                            Back
                        </Button>
                        <Button
                            className="max-lg:text-sm rounded-full"
                            onClick={onSubmit}
                            type="button"
                            loading={isLoading}
                        >
                            Submit
                        </Button>
                    </div>
                    {error && (
                        <p className="text-red-500 text-ms mt-2 text-center">{error}</p>
                    )}
                </div>
            )}
        </>
    );
};

const RebookForm: React.FC<RebookFormProps> = ({ onClose, jobId }) => {
    const [rebookTask, { isLoading: rebookTaskLoading, error: rebookTaskError }] = useRebookJobMutation();
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
    const [isPreview, setIsPreview] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({
        date: '',
        time: '',
        amount: '',
        description: '',
    });
    const [submitError, setSubmitError] = useState<string>('');

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            setErrors(prev => ({ ...prev, date: '' }));
        }
    };

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);
        if (time) {
            setErrors(prev => ({ ...prev, time: '' }));
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as unknown as number;
        setAmount(value);
        if (value) {
            setErrors(prev => ({ ...prev, amount: '' }));
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);
        if (value) {
            setErrors(prev => ({ ...prev, description: '' }));
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = {
            date: '',
            time: '',
            amount: '',
            description: '',
        };

        if (!selectedDate) {
            newErrors.date = 'Please select a date';
            isValid = false;
        }

        if (!selectedTime) {
            newErrors.time = 'Please select a time';
            isValid = false;
        }

        if (!amount) {
            newErrors.amount = 'Please enter an amount';
            isValid = false;
        } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
            newErrors.amount = 'Please enter a valid positive amount';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'Please enter a description';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const formatDateToString = (date: Date | null) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        }
        return "";
    };

    const formatTimeToString = (time: Date | null) => {
        if (time) {
            let hours = time.getHours();
            const minutes = String(time.getMinutes()).padStart(2, "0");
            const period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            const formattedHours = String(hours).padStart(2, "0");
            return `${formattedHours}:${minutes} ${period}`;
        }
        return "";
    };

    const handleSubmit = async () => {
        setSubmitError(''); // Clear any previous submission errors
        if (!validateForm()) {
            return;
        }

        try {
            await rebookTask({
                jobId,
                date: formatDateToString(selectedDate),
                time: formatTimeToString(selectedTime),
                amount,
                description,
            }).unwrap();

            setIsSuccessful(true);
        } catch (error) {
            console.error('Error re-booking task:', error);
            setSubmitError('Something went wrong. Please try again later.');
        }
    };

    const DateCustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
        <button
            className={`flex cursor-pointer justify-between rounded-lg bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold w-full lg:w-[270px] lg:text-[14px] ${errors.date ? "border border-[#ff0000] outline-[#FF0000]" : "border-2 border-primary outline-none"}`}
            onClick={onClick}
            type="button"
        >
            {value || "Choose Date"} <FaSortDown />
        </button>
    );

    const TimeCustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => (
        <button
            className={`flex cursor-pointer justify-between rounded-lg bg-[#EBE9F4] px-2 py-1 text-[12px] placeholder:text-[14px] placeholder:font-bold w-full lg:w-[150px] lg:text-[14px] ${errors.time ? "border border-[#ff0000] outline-[#FF0000]" : "border-2 border-primary  outline-none"}`}
            onClick={onClick}
            type="button"
        >
            {value || "Choose Time"} <FaSortDown />
        </button>
    );

    const handlePreview = () => {
        if (validateForm()) {
            setIsPreview(true);
        }
    };

    const handleBack = () => {
        setIsPreview(false);
    };

    return (
        <div className="relative bg-white rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi">
            <div className="border-b border-primary flex items-center space-x-5 px-5 py-2">
                <div className="bg-[#140B31] p-1 rounded-full size-8 flex items-center justify-center text-white">{RebookSvg}</div>
                <h2 className="text-[#2A1769] font-satoshiBold font-semibold lg:text-lg">Re-book Task</h2>
            </div>
            <form onSubmit={handleSubmit} className="max-lg:p-5 lg:py-5 lg:px-8">
                {!isPreview ? (
                    <>
                        <p className="mb-6 font-satoshiMedium text-base font-medium text-[#140B31]">
                            Please note that when you re-book a task or service, you&apos;ll only be charged once the task is completed.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center w-full justify-between space-x-3">
                                <div className="flex flex-col">
                                    <label htmlFor="taskDate" className="mb-2 text-sm font-semibold text-[#140B31]">Date of re-book</label>
                                    <ReactDatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd-MM-yyyy"
                                        minDate={new Date()}
                                        placeholderText="Choose Date"
                                        id="taskDate"
                                        name="taskDate"
                                        customInput={<DateCustomInput />}
                                        className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                                    />
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="taskTime" className="mb-2 text-sm font-semibold text-[#140B31]">Time</label>
                                    <ReactDatePicker
                                        selected={selectedTime}
                                        onChange={handleTimeChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="h:mm aa"
                                        placeholderText="Choose Time"
                                        id="taskTime"
                                        name="taskTime"
                                        customInput={<TimeCustomInput />}
                                        className="w-full cursor-pointer rounded-2xl bg-[#EBE9F4] px-2 py-1 outline-none placeholder:text-[14px] placeholder:font-bold"
                                    />
                                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="amount" className="block mb-2 text-sm font-semibold text-[#140B31]">Amount</label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className={`w-full bg-[#EBE9F4] p-2 border-2 outline-none rounded-md ${errors.amount ? 'border-red-500' : 'border-primary'}`}
                                />
                                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                            </div>
                            <div>
                                <label htmlFor="rebookDescription" className="block mb-2 text-sm font-semibold text-[#140B31]">Describe your re-book</label>
                                <textarea
                                    id="rebookDescription"
                                    name="rebookDescription"
                                    placeholder="Write reasons for re-booking here..."
                                    rows={4}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className={`w-full p-2 border-2 bg-[#EBE9F4] outline-none rounded-md ${errors.description ? 'border-red-500' : 'border-primary'}`}
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>
                        <div className="flex items-center justify-center my-4 space-x-5">
                            <Button
                                className="max-lg:text-sm rounded-full"
                                onClick={handlePreview}
                                type="button"
                            >
                                Preview date and time
                            </Button>
                        </div>
                    </>
                ) : (
                    <Preview
                        date={selectedDate}
                        time={selectedTime}
                        amount={amount}
                        jobId={jobId}
                        onClose={onClose}
                        success={isSuccessful}
                        isLoading={rebookTaskLoading}
                        description={description}
                        onSubmit={handleSubmit}
                        onBack={handleBack}
                        error={submitError}
                    />
                )}
            </form>
        </div>
    );
};

export default RebookForm;