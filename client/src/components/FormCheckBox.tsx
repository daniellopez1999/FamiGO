import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ArrowPointingDown from '../svg/Arrow-pointing-down.svg';

interface IFormInput {
  option: string;
}

interface IFromCheckBoxProps {
  callback: Function;
  title: string;
  choices: string[];
}

const FormCheckBox: React.FC<IFromCheckBoxProps> = ({
  title,
  choices,
  callback,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { control, watch } = useForm<IFormInput>();

  const selectedOption = watch('option');

  const handleOptionChange = (option: string) => {
    console.log('optionChild:', option);
    callback(option);
  };

  return (
    <div>
      <div onClick={() => setShowOptions(!showOptions)}>
        {title} <img src={ArrowPointingDown} alt="Arrow pointing down" />
      </div>
      {showOptions &&
        choices.map((option, index) => (
          <Controller
            key={index}
            name="option"
            control={control}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  {...field}
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleOptionChange(e.target.value);
                  }}
                />
                {option}
              </label>
            )}
          />
        ))}
    </div>
  );
};

export default FormCheckBox;
