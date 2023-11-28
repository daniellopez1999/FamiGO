interface IActivity {
  activity: {
    filters: Object;
    title: String;
    materials: Array<String>;
    description: String;
  };
}

const GeneratedActivity: React.FC<IActivity> = ({ activity }) => {
  const filterValues = Object.values(activity.filters);

  const handleSaveClick = () => {
    fetch('http://localhost:3000/save-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    }).catch((error) => {
      console.error('Error:', error);
    });
  };
  return (
    <div>
      <h2>{activity.title}</h2>
      <div>
        {filterValues.map((value, index) => (
          <div key={index}># {value}</div>
        ))}
      </div>
      <div>
        {activity.materials.map((material, index) => (
          <div key={index}>-{material}</div>
        ))}
      </div>
      <p>{activity.description}</p>
      <button className="save-button" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

export default GeneratedActivity;
