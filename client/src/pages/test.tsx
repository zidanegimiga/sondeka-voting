import React, { useState } from 'react';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
const nominees = {
  'Category 1': ['Nominee 1', 'Nominee 2', 'Nominee 3', 'Nominee 4', 'Nominee 5'],
  'Category 2': ['Nominee 1', 'Nominee 2', 'Nominee 3', 'Nominee 4', 'Nominee 5'],
  'Category 3': ['Nominee 1', 'Nominee 2', 'Nominee 3', 'Nominee 4', 'Nominee 5'],
  'Category 4': ['Nominee 1', 'Nominee 2', 'Nominee 3', 'Nominee 4', 'Nominee 5'],
  'Category 5': ['Nominee 1', 'Nominee 2', 'Nominee 3', 'Nominee 4', 'Nominee 5'],
};

export default function VoteForm() {
  const [choices, setChoices] = useState([]);

  const handleChoiceChange = (category, nominee) => {
    const updatedChoices = [...choices];
    const existingChoiceIndex = updatedChoices.findIndex((choice) => choice.categoryName === category);

    if (existingChoiceIndex !== -1) {
      // Update existing choice
      updatedChoices[existingChoiceIndex] = {
        ...updatedChoices[existingChoiceIndex],
        selectedNominee: nominee,
      };
    } else {
      // Add new choice
      updatedChoices.push({
        categoryName: category,
        selectedNominee: nominee,
        voterId: "your-user-id-here", // Replace with the actual user ID
      });
    }

    setChoices(updatedChoices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the submission of the choices array.
    // You can send the choices array to your backend or perform any other actions.
    console.log(choices);
  };

  return (
    <div>
      <h1>Vote Form</h1>
      <form onSubmit={handleSubmit}>
        {categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            {nominees[category].map((nominee) => (
              <label key={nominee}>
                <input
                  type="radio"
                  name={category}
                  value={nominee}
                  checked={
                    choices.find((choice) => choice.categoryName === category)?.selectedNominee === nominee
                  }
                  onChange={() => handleChoiceChange(category, nominee)}
                />
                {nominee}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}