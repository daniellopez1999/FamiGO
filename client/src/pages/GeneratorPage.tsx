import NavOutlet from '../components/NavOutlet';
import GenerateForm from '../components/GenerateForm/GenerateForm';

const GeneratorPage = () => {
  return (
    <div>
      <h1>Generate an activity</h1>
      <p>Based on your preferences:</p>
      <GenerateForm />
      <NavOutlet />
    </div>
  );
};
export default GeneratorPage;
