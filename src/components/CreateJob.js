import React, { useState } from 'react';
import { firestore } from '../firebase';

const CreateJob = ({ user }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');

  const handleCreateJob = async () => {
    try {
      const jobData = {
        jobTitle,
        jobDescription,
        jobRequirements,
        createdBy: user.uid,
        createdAt: new Date(),
      };

      // Add job data to Firestore
      await firestore.collection('jobs').add(jobData);

      // Clear form after successful submission
      setJobTitle('');
      setJobDescription('');
      setJobRequirements('');
    } catch (error) {
      console.error('Error creating job:', error.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Create Job Listing</h2>
      <label>
        Job Title:
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      </label>
      <label>
        Job Description:
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </label>
      <label>
        Job Requirements:
        <textarea
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
        />
      </label>
      <button onClick={handleCreateJob}>Create Job</button>
    </div>
  );
};

export default CreateJob;
