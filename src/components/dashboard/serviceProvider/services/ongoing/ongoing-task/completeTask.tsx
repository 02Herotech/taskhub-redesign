import ConfirmationModal from '@/components/global/confirmationModal'
import Popup from '@/components/global/Popup'
import SuccessModal from '@/components/global/successmodal'
import { SuccessIcon } from '@/icons/icons'
import { useCompleteTaskMutation } from '@/services/bookings'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

type StartTaskModalProps = {
  completeTaskPopup: boolean,
  setCompleteTaskPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const CompleteTaskModal = ({ completeTaskPopup, setCompleteTaskPopup }: StartTaskModalProps) => {
  const [step, setStep] = useState(1)
  const pathname = usePathname()
  const jobId = pathname.split("/").pop()!
  const [completeTask, { isLoading }] = useCompleteTaskMutation()

  const handleStartTask = async () => {
    try {
      await completeTask({ jobId })
      setStep(2)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Popup isOpen={completeTaskPopup} onClose={() => setCompleteTaskPopup(false)}>
      {step === 1 &&
        <ConfirmationModal
          title="Are you sure you want to complete this task?"
          description="Please confirm to proceed , remember to only do this if you are done with the task."
          confirmText="Start Task"
          onCancel={() => setCompleteTaskPopup(false)}
          onConfirm={() => handleStartTask()} />


      }
      {step === 2 &&
        <SuccessModal
          title='Success'
          icon={<SuccessIcon />}
          message='Task has been Completed successfully'
          onDone={() => { setCompleteTaskPopup(false); setStep(1) }}
        />
      }
    </Popup>
  )
}

export default CompleteTaskModal