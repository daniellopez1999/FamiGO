import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';

interface IFormInput {
  Topic: {};
  KidsNumber: {};
  AgeRange: {};
  Difficulty: {};
  Place: {};
  Duration: {};
}

const Form: React.FC = () => {
  const topicOptions = [
    { value: 'Nature', label: 'Nature' },
    { value: 'Art', label: 'Art' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Constructions', label: 'Constructions' },
    { value: 'Logic', label: 'Logic' },
    { value: 'Linguistic', label: 'Linguistic' },
  ];

  const kidsOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: 'more than 3', label: 'more than 3' },
  ];

  const ageRangeOptions = [
    { value: '0 - 3', label: '0 - 3' },
    { value: '3 - 5', label: '3 - 5' },
    { value: '5 - 7', label: '5 - 7' },
    { value: '7 - 9', label: '7 - 9' },
    { value: '9 - 12', label: '9 - 12' },
    { value: '12 - 14', label: '12 - 14' },
  ];

  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Expert', label: 'Expert' },
  ];

  const placeOptions = [
    { value: 'Outside', label: 'Outside' },
    { value: 'Inside', label: 'Inside' },
  ];

  const durationOptions = [
    { value: '< 1h', label: '< 1h' },
    { value: '1h < 2h', label: '1h < 2h' },
    { value: '2h < 3h', label: '2h < 3h' },
    { value: '3h <', label: '3h <' },
  ];

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      Topic: '',
      KidsNumber: '',
      AgeRange: '',
      Difficulty: '',
      Place: '',
      Duration: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Todo: Send selected options
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <br />
      <Controller
        name="Topic"
        control={control}
        render={({ field }) => (
          <Select {...field} options={topicOptions} placeholder={'Topic...'} />
        )}
      />
      <br />
      <Controller
        name="KidsNumber"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={kidsOptions}
            placeholder={'Number of kids...'}
          />
        )}
      />
      <br />

      <Controller
        name="AgeRange"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={ageRangeOptions}
            placeholder={'Age range...'}
          />
        )}
      />

      <br />
      <Controller
        name="Difficulty"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={difficultyOptions}
            placeholder={'Difficulty...'}
          />
        )}
      />
      <br />
      <Controller
        name="Place"
        control={control}
        render={({ field }) => (
          <Select {...field} options={placeOptions} placeholder={'Place...'} />
        )}
      />
      <br />
      <Controller
        name="Duration"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={durationOptions}
            placeholder={'Duration...'}
          />
        )}
      />
      <input type="submit" value="Generate" />
    </form>
  );
};

export default Form;
