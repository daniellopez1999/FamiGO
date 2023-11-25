import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormCheckBox from './FormCheckBox';
import LightBulb from '../svg/LightBulb.svg';

// need to import useDispatch & useSelector from redux

interface IFormInput {
  option: string;
}

const Form: React.FC = () => {
  const { handleSubmit } = useForm<IFormInput>();
  const [State, setState] = useState<IFormInput>({ option: '' });

  const handleCallback = (option: string) => {
    console.log('optionParent:', option);
    // Save what it receives (?)
    setState({ option });
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Save selected option (?)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <br />
      <FormCheckBox
        callback={handleCallback}
        title={'Topic'}
        choices={[
          'Nature',
          'Art',
          'Construction',
          'Logic',
          'Sports',
          'Linguistic',
        ]}
      />
      <br />
      <FormCheckBox
        callback={handleCallback}
        title={'Number of kids'}
        choices={['1', '2', '3', 'more than 3']}
      />
      <br />
      Missing: Age Range
      <br />
      <FormCheckBox
        callback={handleCallback}
        title={'Difficulty'}
        choices={['Beginner', 'Intermediate', 'Expert']}
      />
      <br />
      <FormCheckBox
        callback={handleCallback}
        title={'Place'}
        choices={['Outside', 'Inside']}
      />
      <br />
      <FormCheckBox
        callback={handleCallback}
        title={'Duration'}
        choices={['< 1h', '1h < 2h', '2h < 3h', '3h <']}
      />
      <button>
        Generate
        <img src={LightBulb} alt="LightBulb" />
      </button>
    </form>
  );
};

export default Form;
