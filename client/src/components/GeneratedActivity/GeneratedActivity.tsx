interface IActivity {
  activity: {
    filters: Array<String>;
    title: String;
    materials: Array<String>;
    description: String;
  };
}

const GeneratedActivity: React.FC<IActivity> = ({ activity }) => {
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
        {activity.filters.map((filter, index) => (
          <div key={index}># {filter}</div>
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
