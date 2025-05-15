import ConfirmationModal from '@/components/global/confirmationModal'
import Popup from '@/components/global/Popup'
import SuccessModal from '@/components/global/successmodal'
import { SuccessIcon } from '@/icons/icons'
import { useStartTaskMutation } from '@/services/bookings'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

type StartTaskModalProps = {
  startTaskPopup: boolean,
  setStartTaskPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const StartTaskModal = ({ startTaskPopup, setStartTaskPopup }: StartTaskModalProps) => {
  const [step, setStep] = useState(1)
  const pathname = usePathname()
  const jobId = pathname.split("/").pop()!
  const [startTask, { isLoading, error, isSuccess }] = useStartTaskMutation()
  console.log(isSuccess, "isSuccess")

  const handleStartTask = async () => {
    try {
    await startTask({ jobId }).unwrap();
    setStep(2);
  } catch (err) {
    console.error("Failed to start task:", err);
  }
};

  return (
    <Popup isOpen={startTaskPopup} onClose={() => setStartTaskPopup(false)}>
      {step === 1 &&
        <ConfirmationModal
          title="Are you sure you want to complete this task?"
          description="Please confirm to proceed , remember to only do this if you are done with the task."
          confirmText="Start Task"
        isLoading={isLoading}
        error={error?.data.message as unknown as any}
          onCancel={() => setStartTaskPopup(false)}
          onConfirm={() => handleStartTask()} />

      }
      {step === 2 &&
        <SuccessModal
          title='Success'
          icon={<SuccessIcon />}
          message='Task has been started successfully'
          onDone={() => { setStartTaskPopup(false); setStep(1) }}
        />
      }
    </Popup>
  )
}

export default StartTaskModal