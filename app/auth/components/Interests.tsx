import { useState } from "react"
import { useMutation } from "blitz"
import internSignup from "../mutations/intern-signup"
import { Popup } from "../../core/components/Popup"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { Button } from "../../core/components/Button"
import { SignUpValues } from "./SignupForm"

interface InternValues extends SignUpValues {
  bio: string
  oneliner: string
  logo: string
}

export const Interests = ({
  onSuccess,
  interest,
}: {
  onSuccess(interests: string[]): void
  interest: string[]
}) => {
  const [signUpMutation] = useMutation(internSignup)
  const [interests, setInterests] = useState<string[]>(interest || [])
  const fields = [
    "Web development",
    "AI/ML",
    "Systems",
    "Game development",
    "Startups",
    "Robotics/IoT",
    "Trading",
  ]

  const isSelected = (value) => interests.find((v) => v === value)

  const handleInterestSelect = (value: string) => {
    if (value === "") {
      return
    } else if (isSelected(value)) {
      setInterests(interests.filter((v) => v !== value))
    } else {
      setInterests([...interests, value])
    }
  }

  const onSubmit = async () => {
    onSuccess(interests)
  }

  return (
    <Popup title="Your interests" step={2} scroll={true}>
      <div className="flex flex-col gap-5 px-8 py-10 mb-4">
        <span className="text-neutral-800">
          Which field do you specialize in? Which field interests you?
        </span>
        <div className="flex pt-4 flex-col gap-5 w-[80vw] sm:w-[50vw] lg:w-[35vw] xl:w-[28vw] cursor-pointer">
          {fields.map((field) => {
            const selected = isSelected(field)
            return (
              <div
                className="flex items-center justify-between rounded-lg p-5 bg-white"
                style={{ border: `1px solid ${selected ? "#5c6cff" : "#e6e6e6"}` }}
                key={field}
                onClick={() => handleInterestSelect(field)}
              >
                <span>{field}</span>
                {selected && <BsFillCheckCircleFill color="#5c6cff" />}
              </div>
            )
          })}
        </div>
        {interests.length === 0 && (
          <span className="text-red-500 text-sm italic">
            Select at least one interest to continue
          </span>
        )}
        <Button options="w-full" {...{ disabled: interests.length === 0, onClick: onSubmit }}>
          Next
        </Button>
      </div>
    </Popup>
  )
}
