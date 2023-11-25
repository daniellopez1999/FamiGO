import NavOutlet from '../components/NavOutlet';
import Form from '../components/Form';

const GeneratorPage = () => {
  return (
    <div>
      <h1>Generate an activity</h1>
      <p>Based on your preferences:</p>
      <Form />
      {/* BUTTON */}
      <NavOutlet />
    </div>
  );
};
export default GeneratorPage;
