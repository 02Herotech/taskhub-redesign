import Button from "@/components/global/Button";
import Popup from "@/components/global/Popup";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, selectedTime, error, loading }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedTime: string;
    error?: string;
    loading: boolean;
}) => {
    if (!isOpen) return null;

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="relative bg-[#EBE9F4] rounded-2xl min-h-[200px] lg:w-[577px] font-satoshi overflow-y-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Confirm Inspection Time</h2>
                <p className="mb-6">Are you sure you want to start the inspection for {selectedTime}?</p>
                <div className="flex justify-end space-x-4">
                    <Button theme="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onConfirm} loading={loading}>Confirm</Button>
                </div>
                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
            </div>
        </Popup>
    );
};

export default ConfirmationModal;