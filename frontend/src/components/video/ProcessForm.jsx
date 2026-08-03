import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link2, ChevronDown } from 'lucide-react'
import { videoService } from '../../services/video.service'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProcessingSteps from './ProcessingSteps'

const LANGUAGES = [
  { value: 'english', label: '🇬🇧 English' },
  { value: 'hinglish', label: '🇮🇳 Hinglish' },
]

export default function ProcessForm({ onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const stepTimerRef = useRef(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { youtubeUrl: '', language: 'english' },
  })

  const STEP_DURATIONS = [8000, 18000, 12000, 10000] // ms per step

  const startProgressSimulation = () => {
    let step = 1
    setProcessingStep(step)

    const advance = () => {
      step++
      if (step <= 4) {
        setProcessingStep(step)
        stepTimerRef.current = setTimeout(advance, STEP_DURATIONS[step - 1] || 8000)
      }
    }
    stepTimerRef.current = setTimeout(advance, STEP_DURATIONS[0])
  }

  const stopProgress = () => {
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current)
  }

  const onSubmit = async ({ youtubeUrl, language }) => {
    setIsProcessing(true)
    setProcessingStep(1)
    startProgressSimulation()

    try {
      const res = await videoService.processVideo({ youtubeUrl, language })
      stopProgress()
      setProcessingStep(5) // completed
      toast.success(res.data.message?.includes('cache') ? 'Loaded from cache!' : 'Video processed!')

      setTimeout(() => {
        reset()
        setIsProcessing(false)
        setProcessingStep(0)
        onSuccess?.(res.data)
      }, 1000)
    } catch (err) {
      stopProgress()
      setIsProcessing(false)
      setProcessingStep(0)
      const msg = err.response?.data?.error || 'Processing failed. Please try again.'
      toast.error(msg)
    }
  }

  if (isProcessing) {
    return <ProcessingSteps currentStep={processingStep} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="YouTube URL"
        icon={Link2}
        placeholder="https://www.youtube.com/watch?v=..."
        error={errors.youtubeUrl?.message}
        {...register('youtubeUrl', {
          required: 'YouTube URL is required',
          pattern: {
            value: /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/,
            message: 'Please enter a valid YouTube URL',
          },
        })}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-300">Language</label>
        <div className="relative">
          <select
            className="input-field appearance-none pr-10 cursor-pointer"
            {...register('language')}
          >
            {LANGUAGES.map(({ value, label }) => (
              <option key={value} value={value} style={{ background: '#111827', color: '#fff' }}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isProcessing}
        disabled={isProcessing}
        size="lg"
        className="w-full font-semibold"
      >
        Process Video
      </Button>

      <p className="text-xs text-center text-gray-600">
        Processing usually takes 30–90 seconds depending on video length.
      </p>
    </form>
  )
}
