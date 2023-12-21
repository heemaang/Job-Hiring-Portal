import React, { useState } from 'react';
import { firestore } from '../firebase';

const ApplyJob = ({ jobId }) => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResume, setApplicantResume] = useState('');

  const handleApplyJob = async () => {
    try {
      const applicationData = {
        jobId, // The ID of the job listing
        applicantName,
        applicantEmail,
        applicantResume,
        appliedAt: new Date(),
      };

      // Add application data to Firestore
      await firestore.collection('applications').add(applicationData);

      // Clear form after successful submission
      setApplicantName('');
      setApplicantEmail('');
      setApplicantResume('');

      // You can add a success message or redirect the user to a thank-you page
    } catch (error) {
      console.error('Error submitting application:', error.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Apply for the Job</h2>
      <label>
        Your Name:
        <input type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
      </label>
      <label>
        Your Email:
        <input type="email" value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} />
      </label>
      <label>
        Resume/CV:
        <textarea value={applicantResume} onChange={(e) => setApplicantResume(e.target.value)} />
      </label>
      <button onClick={handleApplyJob}>Apply</button>
    </div>
  );
};

export default ApplyJob;
